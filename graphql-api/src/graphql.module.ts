import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './user.resolver';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [UserResolver, CommentResolver, UserService, CommentService],
})
export class AppModule {}
