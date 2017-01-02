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
        deps: [initStateToken, dispatcherToken, CalendarService]
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
    calendarService: CalendarService): Observable<AppState> {

    const appStateObs: Observable<AppState> = reduceState(initialState, actions, calendarService).share();
    return wrapIntoBehavior(initialState, appStateObs);
}

function reduceState(
    initialState: any,
    actions: Observable<Action>,
    calendarService: CalendarService): Observable<AppState> {

    return actions.scan((state: AppState, action: Action) => {

        if (!state.requirements) {
            state.requirements = [];
        }

        switch (action.type) {
            case ActionType.GenerateCalendar:
                state.calendar = calendarService.generateCalendar((action as Actions.GenerateCalendarAction).month);
                break;
            case ActionType.AddRequirement:
                let a = <Actions.AddRequirementAction>action;
                state.requirements.push(new Requirement(<IRequirement>{
                    date: a.date,
                    priority: a.priority,
                    workUser: a.workUser,
                    requirementType: a.requirementType
                }));
        }

        return state;
    });
}
