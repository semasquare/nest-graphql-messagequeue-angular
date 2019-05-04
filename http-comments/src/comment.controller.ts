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

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getComments(): Promise<Comment[]> {
    return this.commentService.getComments();
  }

  @Get(':id')
  getSingleComment(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Comment> {
    return this.commentService.getSingleComment(id);
  }

  @Post()
  addComment(@Body() newComment: Comment): Promise<void> {
    return this.commentService.addComment(newComment);
  }
}
