import { Injectable } from '@angular/core';
import { List } from 'immutable';

import { WorkUser } from '../model/work-user';

export var workUserMarianaId: number = 4;

@Injectable()
export class UserStore {

  private workers = List<WorkUser>();

  constructor() {
    this.workers = List([
      new WorkUser({ id: 1, name: 'Katka' }),
      new WorkUser({ id: 2, name: 'Matej' }),
      new WorkUser({ id: 3, name: 'David' }),
      new WorkUser({ id: workUserMarianaId, name: 'Mariana' }),
      new WorkUser({ id: 5, name: 'Honza' }),
      new WorkUser({ id: 6, name: 'Tomas' })
    ]);
  }

  public getWorkers(): List<WorkUser> {
    return this.workers;
  }

  public getById(id: number): WorkUser {
    let value = this.workers.find(w => w.id === id);
    if (value) {
      return value;
    }

    throw new Error(`WorkUser not found for id: '${id}'`);
  }
}
