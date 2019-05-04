import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { GraphQLModule } from '@nestjs/graphql';
import { InMemoryLRUCache, KeyValueCache } from 'apollo-server-caching';
import { UserResolver } from './user.resolver';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

/*
It is currently not possible to use apollo datasources in a nestjs way like decorators
https://stackoverflow.com/questions/54517872/nestjs-graphql-datasources
https://github.com/nestjs/nest/issues/945

Another way would be to make nestjs understands them or
don't use datasources and execute http requests with another way
*/

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [
    UserResolver,
    CommentResolver,
    {
      provide: UserService,
      useFactory: () => {
        const userService = new UserService();
        userService.initialize({
          cache: new InMemoryLRUCache(),
          context: {},
        });
        return userService;
      },
    },
    {
      provide: CommentService,
      useFactory: () => {
        const commentService = new CommentService();
        commentService.initialize({
          cache: new InMemoryLRUCache(),
          context: {},
        });
        return commentService;
      },
    },
  ],
})
export class AppModule {}
