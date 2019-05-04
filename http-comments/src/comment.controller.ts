import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.model';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('comment')
  getComments(): Promise<Comment[]> {
    return this.commentService.getComments();
  }

  @Get('comment/:id')
  getSingleComment(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Comment> {
    return this.commentService.getSingleComment(id);
  }

  @Get('commentByUserId/:userId')
  async getCommentsByUserId(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<Comment[]> {
    const comments = await this.commentService.getComments();
    return comments.filter(comment => comment.userId === userId);
  }

  @Post('comment')
  addComment(@Body() newComment: Comment): Promise<Comment> {
    return this.commentService.addComment(newComment);
  }
}
