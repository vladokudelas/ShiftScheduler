import { Injectable } from '@angular/core';
import { List } from 'immutable';

import { WorkUser } from '../model/work-user';

export let workUserMarianaId = 4;

@Injectable()
export class UserStore {

  private workers = List<WorkUser>();

  constructor() {
    this.workers = List([
      new WorkUser({ id: 1, name: 'Katka', colorCss: 'katka-bckg', shortcut: 'Ku' }),
      new WorkUser({ id: 2, name: 'Matej', colorCss: 'matej-bckg', shortcut: 'Gl' }),
      new WorkUser({ id: 3, name: 'David', colorCss: 'david-bckg', shortcut: 'Kš' }),
      new WorkUser({ id: workUserMarianaId, name: 'Mariana', colorCss: 'mariana-bckg', shortcut: 'Mi' }),
      new WorkUser({ id: 5, name: 'Honza', colorCss: 'honza-bckg', shortcut: 'Ad' }),
      new WorkUser({ id: 6, name: 'Tomas', colorCss: 'tomas-bckg', shortcut: 'Vo' })
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
