import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/entities/repositories/user_repository";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistence/entities/user_entity";
import { UserMapper } from "../persistence/mappers/user_mapper";

export class TypeOrmUserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;
  constructor(repository: Repository<UserEntity>) {
    this.repository = repository;
  }
  async save(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    await this.repository.save(userEntity);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    if (!userEntity) return null;
    return UserMapper.toDomain(userEntity);
  }
}
