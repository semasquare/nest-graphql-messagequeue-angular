import { Injectable, Scope } from '@nestjs/common';

import { RESTDataSource, Request } from 'apollo-datasource-rest';
import { Comment, CommentCreateDto } from './comment.model';

@Injectable({ scope: Scope.REQUEST })
export class CommentService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3002/';
  }

  // Workaround to disable caching
  cacheKeyFor(request: Request): string {
    return request.url + Math.random();
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
