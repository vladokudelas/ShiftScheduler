import { Injectable } from '@angular/core';

import { WorkUser } from '../model/work-user';

@Injectable()
export class UserStore {

  private workers: WorkUser[] = [];

  constructor() {
    this.workers = [
      new WorkUser({ id: 1, name: 'Katka', colorCss: 'katka-bckg', shortcut: 'Ku' }),
      new WorkUser({ id: 2, name: 'Matej', colorCss: 'matej-bckg', shortcut: 'Gl' }),
      new WorkUser({ id: 3, name: 'David', colorCss: 'david-bckg', shortcut: 'Kš' }),
      new WorkUser({ id: 4, name: 'Botos', colorCss: 'mariana-bckg', shortcut: 'Bo' }),
      new WorkUser({ id: 5, name: 'Honza', colorCss: 'honza-bckg', shortcut: 'Ad' }),
      new WorkUser({ id: 6, name: 'Tomas', colorCss: 'tomas-bckg', shortcut: 'Vo' })
    ];
  }

  public getWorkers(): WorkUser[] {
    return $.extend(true, [], this.workers);
  }

  public getById(id: number): WorkUser {
    let value = this.workers.find(w => w.id === id);
    if (value) {
      return value;
    }

    throw new Error(`WorkUser not found for id: '${id}'`);
  }
}
