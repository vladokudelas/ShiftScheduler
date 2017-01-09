import { UserStore } from '../service/user.store';
import { OpaqueToken } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { List } from 'immutable';

import { Action, ActionType } from './actions';
import * as Actions from './actions';
import { AppState, initAppState } from './state.model';
import { CalendarService } from '../service';
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
        deps: [initStateToken, dispatcherToken, CalendarService, UserStore]
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
    userStore: UserStore): Observable<AppState> {

    const appStateObs: Observable<AppState> = reduceState(initialState, actions, calendarService, userStore).share();
    return wrapIntoBehavior(initialState, appStateObs);
}

var requirementsIdCounter: number = 1;

function reduceState(
    initialState: any,
    actions: Observable<Action>,
    calendarService: CalendarService,
    userStore: UserStore): Observable<AppState> {

    return actions.scan((state: AppState, action: Action) => {

        if (!state.requirements) {
            state.requirements = List<Requirement>();
        }

        switch (action.type) {
            case ActionType.GenerateCalendar:
                state.selectedMonth = (action as Actions.GenerateCalendarAction).month;
                state.calendar = calendarService.generateCalendar(state.selectedMonth);
                let requirements = calendarService.generateAutoRequirements(state.selectedMonth, state.calendar, { id: requirementsIdCounter });
                state.requirements = state.requirements.concat(requirements).toList();
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
                break;
            case ActionType.RemoveRequirement:
                let reqIdxToRemove = state.requirements.findIndex(r => r.id == (<Actions.RemoveRequirementAction>action).id);
                if (reqIdxToRemove >= 0) {
                    state.requirements = state.requirements.remove(reqIdxToRemove);
                }
                break;
            case ActionType.ChangeWorkUser:
                let cwua = <Actions.ChangeWorkUserAction>action;
                if (cwua.workUserId > 0) {
                    cwua.cell.workUser = userStore.getById(cwua.workUserId);
                } else {
                    cwua.cell.workUser = undefined;
                }
                break;
            case ActionType.ChangeShiftHours:
                let csha = <Actions.ChangeShiftHoursAction>action;
                csha.cell.shiftHours = csha.shiftHours;
                break;
        }
        state.hourInfo = calendarService.calculateHours(state.calendar, state.requirements);

        return state;
    });
}
