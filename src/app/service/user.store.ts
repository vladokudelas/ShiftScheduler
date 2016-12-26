import { Injectable } from '@angular/core';
import { List } from 'immutable';

import { WorkUser } from '../model/work-user';

@Injectable()
export class UserStore {

  private workers = List<WorkUser>();

  constructor() {
    this.workers = List([
      new WorkUser({ id: 1, name: 'Kacenka' }),
      new WorkUser({ id: 2, name: 'Matej' }),
      new WorkUser({ id: 3, name: 'David' }),
      new WorkUser({ id: 4, name: 'Mariana' }),
      new WorkUser({ id: 5, name: 'Honza' }),
      new WorkUser({ id: 6, name: 'Tomas' })
    ]);
  }

  public getWorkers(): List<WorkUser> {
    return this.workers;
  }

}
