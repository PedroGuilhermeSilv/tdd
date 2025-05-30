import { IUserRepository } from "../../domain/entities/repositories/user_repository";
import { User } from "../../domain/entities/user";

export class UserService {
  private readonly userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
