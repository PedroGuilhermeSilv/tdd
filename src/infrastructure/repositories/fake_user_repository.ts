import { IUserRepository } from "../../domain/entities/repositories/user_repository";
import { User } from "../../domain/entities/user";

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [];
  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }
  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
