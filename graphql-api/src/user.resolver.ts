import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserCreateDto } from './user.model';
import { CommentService } from './comment.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Query(returns => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @Query(returns => User)
  getSingleUser(@Args('id') id: number) {
    return this.userService.getSingleUser(id);
  }

  @ResolveProperty()
  comments(@Parent() user: User) {
    return this.commentService.getCommentsByUserId(user.id);
  }

  @Mutation(returns => User)
  addUser(@Args('newUser') newUser: UserCreateDto) {
    return this.userService.addUser(newUser);
  }
}
