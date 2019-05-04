import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];
  private counter = 0;

  constructor() {
    this.addUser({ id: 1, name: 'Claire Werk', age: 34 });
    this.addUser({ id: 2, name: 'Harry Bo', age: 25 });
    this.addUser({ id: 3, name: 'Frank Reich', age: 65 });
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getSingleUser(id: number): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async addUser(newUser: User): Promise<void> {
    this.counter++;

    newUser.id = this.counter;

    this.users.push(newUser);
  }
}
