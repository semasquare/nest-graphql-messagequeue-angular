import { Injectable, Scope } from '@nestjs/common';

import { RESTDataSource, Request } from 'apollo-datasource-rest';
import { User, UserCreateDto } from './user.model';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/user/';
  }

  // Workaround to disable caching
  cacheKeyFor(request: Request): string {
    return request.url + Math.random();
  }

  async getUsers() {
    return this.get<User[]>('');
  }

  async getSingleUser(id: number) {
    return this.get<User>(`${id}`);
  }

  async addUser(newUser: UserCreateDto) {
    // s. https://github.com/apollographql/apollo-server/issues/1539
    return this.post<User>('', new Object({ ...newUser }));
  }
}
