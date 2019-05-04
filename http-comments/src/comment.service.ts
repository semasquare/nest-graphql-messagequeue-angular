import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';

@Injectable()
export class CommentService {
  private comments: Comment[] = [];
  private counter = 0;

  constructor() {
    this.addComment({ id: 1, userId: 1, message: 'Hello!' });
    this.addComment({ id: 2, userId: 1, message: 'Hello again!' });
    this.addComment({ id: 3, userId: 3, message: 'Welcome!' });
  }

  async getComments(): Promise<Comment[]> {
    return this.comments;
  }

  async getSingleComment(id: number): Promise<Comment> {
    return this.comments.find(comment => comment.id === id);
  }

  async addComment(newComment: Comment): Promise<Comment> {
    this.counter++;

    newComment.id = this.counter;

    this.comments.push(newComment);

    return newComment;
  }
}
