import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { User } from './user.model';

@ObjectType()
export class Comment {
  @Field(type => Int)
  public id: number;

  @Field()
  public message: string;

  @Field(type => User)
  public user: User;

  public userId: number;
}

// tslint:disable-next-line: max-classes-per-file
@InputType('CommentInput')
export class CommentCreateDto {
  @Field(type => Int)
  public userId: number;

  @Field()
  public message: string;
}
