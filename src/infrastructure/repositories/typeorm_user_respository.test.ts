import { DataSource, Repository } from "typeorm";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeOrmUserRepository } from "./typeorm_user_repository";

describe("TypeOrmUserRepository", () => {
  let dataSource: DataSource;
  let userRepository: TypeOrmUserRepository;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(UserEntity);
    userRepository = new TypeOrmUserRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve criar um usuário com sucesso", async () => {
    const user = await userRepository.save(
      new User("123456", "teste@teste.com"),
    );

    const user_on_db = await userRepository.findById(user.getId());
    expect(user_on_db).toBeDefined();
    expect(user_on_db?.getName()).toBe("teste@teste.com");
    expect(user_on_db?.getId()).toBe("123456");
  });

  it("deve retornar null quando o usuário não for encontrado", async () => {
    const user = await userRepository.findById("111111");
    expect(user).toBeNull();
  });

  it("deve retornar o usuário quando for encontrado", async () => {
    const user = await userRepository.save(
      new User("123456", "teste@teste.com"),
    );
    const user_on_db = await userRepository.findById(user.getId());
    expect(user_on_db).toBeDefined();
    expect(user_on_db?.getName()).toBe("teste@teste.com");
    expect(user_on_db?.getId()).toBe("123456");
  });
});
