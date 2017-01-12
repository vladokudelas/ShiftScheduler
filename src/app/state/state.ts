import { OpaqueToken } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { List } from 'immutable';

import { Action, ActionType } from './actions';
import * as Actions from './actions';
import { AppState, initAppState } from './state.model';
import { CalendarService, UserStore, RulesService } from '../service';
import { Requirement, IRequirement } from '../model';

export const initStateToken = new OpaqueToken('initState');
export const dispatcherToken = new OpaqueToken('dispatcher');
export const stateToken = new OpaqueToken('state');

// this is what is actually injected in the app component when using 'providers: stateAndDispatcher'
export const stateAndDispatcher = [
    {
        provide: initStateToken,
        useValue: initAppState
    },
    {
        provide: dispatcherToken,
        useFactory: subjectFactory
    },
    {
        provide: stateToken,
        useFactory: stateFactory,
        deps: [initStateToken, dispatcherToken, CalendarService, UserStore, RulesService]
    }
];

export function subjectFactory(): Subject<Action> {
    return new Subject<Action>();
}

function wrapIntoBehavior(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
}

export function stateFactory(
    initialState: AppState,
    actions: Observable<Action>,
    calendarService: CalendarService,
    userStore: UserStore,
    ruleService: RulesService): Observable<AppState> {

    const appStateObs: Observable<AppState> = reduceState(initialState, actions, calendarService, userStore, ruleService).share();
    return wrapIntoBehavior(initialState, appStateObs);
}

let requirementsIdCounter = 1;

function reduceState(
    initialState: any,
    actions: Observable<Action>,
    calendarService: CalendarService,
    userStore: UserStore,
    ruleService: RulesService): Observable<AppState> {

    return actions.scan((state: AppState, action: Action) => {

        if (!state.requirements) {
            state.requirements = List<Requirement>();
        }

        switch (action.type) {
            case ActionType.GenerateCalendar:
                state.selectedMonth = (action as Actions.GenerateCalendarAction).month;
                state.calendar = calendarService.generateCalendar(state.selectedMonth);
                ruleService.assignWorkUsersAccordingToRequirements(state.calendar, state.requirements);
                let requirements = calendarService.generateAutoRequirements(state.selectedMonth, state.calendar, { id: requirementsIdCounter }, state.requirements);
                state.requirements = state.requirements.concat(requirements).toList();
                state.calendar = calendarService.setRequirementsInCalendar(state.selectedMonth, state.calendar, state.requirements);
                break;
            case ActionType.AddRequirement:
                let a = <Actions.AddRequirementAction>action;
                state.requirements = state.requirements.push(new Requirement(<IRequirement>{
                    id: requirementsIdCounter++,
                    date: a.date,
                    priority: a.priority,
                    workUser: a.workUser,
                    requirementType: a.requirementType
                }));
                state.calendar = calendarService.setRequirementsInCalendar(state.selectedMonth, state.calendar, state.requirements);
                break;
            case ActionType.RemoveRequirement:
                let reqIdxToRemove = state.requirements.findIndex(r => r.id === (<Actions.RemoveRequirementAction>action).id);
                if (reqIdxToRemove >= 0) {
                    state.requirements = state.requirements.remove(reqIdxToRemove);
                }
                state.calendar = calendarService.setRequirementsInCalendar(state.selectedMonth, state.calendar, state.requirements);
                break;
            case ActionType.ChangeWorkUser:
                let cwua = <Actions.ChangeWorkUserAction>action;
                ruleService.setWorkUserToCell(cwua.workUserId, cwua.cell, state.calendar);
                break;
            case ActionType.ChangeShiftHours:
                let csha = <Actions.ChangeShiftHoursAction>action;
                csha.cell.shiftHours = csha.shiftHours;
                break;
        }
        if (state.calendar) {
            state.hourInfo = calendarService.calculateHours(state.selectedMonth, state.calendar, state.requirements);
            state.calendar = ruleService.checkCalendarCellValidity(state.selectedMonth, state.calendar);
        }

        return state;
    });
}
