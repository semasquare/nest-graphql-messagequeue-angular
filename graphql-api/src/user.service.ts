import { Injectable, Scope } from '@nestjs/common';

import { RESTDataSource, Request } from 'apollo-datasource-rest';
import { User, UserCreateDto } from './user.model';
import { InMemoryLRUCache } from 'apollo-server-caching';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/user/';

    /*
    It is currently not possible to use apollo datasources in a nestjs way like decorators
    https://stackoverflow.com/questions/54517872/nestjs-graphql-datasources
    https://github.com/nestjs/nest/issues/945

    Another way would be to make nestjs understands them or
    don't use datasources and execute http requests with another way

    https://github.com/graphql/dataloader
    */
    this.initialize({
      cache: new InMemoryLRUCache(),
      context: {},
    });
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
