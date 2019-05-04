import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { Comment } from './comment.model';

@ObjectType()
export class User {
  @Field(type => Int)
  public id: number;

  @Field()
  public name: string;

  @Field(type => Int)
  public age: number;

  @Field(type => [Comment])
  public comments: Comment[];
}

// tslint:disable-next-line: max-classes-per-file
@InputType('UserCreateDto')
export class UserCreateDto {
  @Field()
  public name: string;

  @Field(type => Int)
  public age: number;
}
