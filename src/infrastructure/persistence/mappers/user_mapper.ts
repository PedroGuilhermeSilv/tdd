import { User } from "../../../domain/entities/user";
import { UserEntity } from "../entities/user_entity";

export class UserMapper {
  static toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.getId();
    userEntity.name = user.getName();
    return userEntity;
  }

  static toDomain(userEntity: UserEntity): User {
    return new User(userEntity.id, userEntity.name);
  }
}
