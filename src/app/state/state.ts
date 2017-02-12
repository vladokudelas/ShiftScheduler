import { OpaqueToken } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { Action, ActionType } from './actions';
import * as Actions from './actions';
import { AppState, initAppState } from './state.model';
import { CalendarService, UserStore, RulesService, DateService } from '../service';
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
        deps: [initStateToken, dispatcherToken, CalendarService, UserStore, RulesService, Http, DateService]
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
    ruleService: RulesService,
    http: Http,
    dateService: DateService): Observable<AppState> {

    const appStateObs: Observable<AppState> = reduceState(initialState, actions, calendarService, userStore, ruleService, http, dateService).share();
    return wrapIntoBehavior(initialState, appStateObs);
}

let requirementsIdCounter = 1;

function reduceState(
    initialState: any,
    actions: Observable<Action>,
    calendarService: CalendarService,
    userStore: UserStore,
    ruleService: RulesService,
    http: Http,
    dateService: DateService): Observable<AppState> {

    return actions.scan((state: AppState, action: Action) => {

        if (!state.requirements) {
            state.requirements = [];
        }

        if (!state.workUserFilter) {
            state.workUserFilter = {};
        }

        let saveState = true;
        switch (action.type) {
            case ActionType.GenerateCalendar:
                state.selectedMonth = (action as Actions.GenerateCalendarAction).month;
                state.calendar = calendarService.generateCalendar(state.selectedMonth);
                ruleService.assignWorkUsersAccordingToRequirements(state.calendar, state.requirements);
                let requirements = calendarService.generateAutoRequirements(state.selectedMonth, state.calendar, { id: requirementsIdCounter }, state.requirements);
                state.requirements = state.requirements.concat(requirements);
                state.calendar = calendarService.setRequirementsInCalendar(state.selectedMonth, state.calendar, state.requirements);
                break;
            case ActionType.AddRequirement:
                let a = <Actions.AddRequirementAction>action;
                state.requirements.push(new Requirement(<IRequirement>{
                    id: requirementsIdCounter++,
                    date: a.date,
                    workUser: a.workUser,
                    requirementType: a.requirementType
                }));
                state.calendar = calendarService.setRequirementsInCalendar(state.selectedMonth, state.calendar, state.requirements);
                break;
            case ActionType.RemoveRequirement:
                let reqIdxToRemove = state.requirements.findIndex(r => r.id === (<Actions.RemoveRequirementAction>action).id);
                if (reqIdxToRemove >= 0) {
                    state.requirements.splice(reqIdxToRemove, 1);
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
            case ActionType.ToggleWorkUserFilter:
                let twufa = <Actions.ToggleWorkUserFilterAction>action;
                if (state.workUserFilter.hasOwnProperty(twufa.workUser.id)) {
                    delete state.workUserFilter[twufa.workUser.id];
                } else {
                    state.workUserFilter[twufa.workUser.id] = twufa.workUser;
                }
                break;
            case ActionType.Save:
                sendNewState(state, http, true);
                saveState = false;
                break;
            case ActionType.Load:
                state = loadState((<Actions.LoadAction>action).jsonStr, userStore, dateService);
                saveState = false;
                break;
        }
        if (state.calendar) {
            state.hourInfo = calendarService.calculateHours(state.selectedMonth, state.calendar, state.requirements);
            state.calendar = ruleService.checkCalendarCellValidity(state.selectedMonth, state.calendar);
        }

        if (saveState) {
            sendNewState(state, http, false);
        }

        return state;
    });
}

function loadState(jsonStr: string, userStore: UserStore, dateService: DateService): AppState {
    let jsonPojo = JSON.parse(jsonStr);
    return new AppState(jsonPojo, userStore);
}

function sendNewState(state: AppState, http: Http, isSaveAction: boolean) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let content = {
        month: state.selectedMonth,
        data: state
    };

    let url;
    if (isSaveAction) {
        url = 'http://localhost:3000/save/';
    } else {
        url = 'http://localhost:3000/';
    }

    let prom = http.post(url, JSON.stringify(content), options)
                .toPromise();
    if (isSaveAction) {
        prom.then((val) => {
            alert('Saved ' + val);
        }).catch((val) => {
            console.error(val);
            alert('!!!!!!!!!!!!!!!!!!!!!! ERROR: ' + val);
        });
    }
}
