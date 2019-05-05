import { Injectable, Scope } from '@nestjs/common';

import { RESTDataSource, Request } from 'apollo-datasource-rest';
import { Comment, CommentCreateDto } from './comment.model';
import { InMemoryLRUCache } from 'apollo-server-caching';

@Injectable({ scope: Scope.REQUEST })
export class CommentService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3002/';

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

  getComments() {
    return this.get<Comment[]>('comment');
  }

  getSingleComment(id: number) {
    return this.get<Comment>(`comment/${id}`);
  }

  addComment(newComment: CommentCreateDto) {
    // s. https://github.com/apollographql/apollo-server/issues/1539
    return this.post<Comment>('comment', new Object({ ...newComment }));
  }

  getCommentsByUserId(userId: number) {
    return this.get<Comment[]>(`commentByUserId/${userId}`);
  }
}
