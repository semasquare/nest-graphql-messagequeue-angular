import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment, CommentCreateDto } from './comment.model';
import { UserService } from './user.service';

@Resolver(of => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  @Query(returns => [Comment])
  getComments() {
    return this.commentService.getComments();
  }

  @Query(returns => Comment)
  getSingleComment(@Args('id') id: number) {
    return this.commentService.getSingleComment(id);
  }

  @ResolveProperty()
  user(@Parent() comment: Comment) {
    return this.userService.getSingleUser(comment.userId);
  }

  @Mutation(returns => Comment)
  addComment(@Args('newComment') newComment: CommentCreateDto) {
    return this.commentService.addComment(newComment);
  }
}
