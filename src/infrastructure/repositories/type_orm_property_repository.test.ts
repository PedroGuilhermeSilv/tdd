import { DataSource, Repository } from "typeorm";
import { Property } from "../../domain/entities/property";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeOrmPropertyRepository } from "./type_orm_property_repository";

describe("TypeOrmPropertyRepository", () => {
  let dataSource: DataSource;
  let propertyRepository: TypeOrmPropertyRepository;
  let repository: Repository<PropertyEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity, BookingEntity, UserEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(PropertyEntity);
    propertyRepository = new TypeOrmPropertyRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve criar uma propriedade com sucesso", async () => {
    const property = await propertyRepository.save(
      new Property("123456", "nome", "descrição", 1, 100, []),
    );

    const property_on_db = await propertyRepository.findById(property.getId());

    expect(property_on_db).toBeDefined();
    expect(property_on_db?.getId()).toBe("123456");
    expect(property_on_db?.getName()).toBe("nome");
  });

  it("deve retornar null quando a propriedade não for encontrada", async () => {
    const property = await propertyRepository.findById("111111");
    expect(property).toBeNull();
  });

  it("deve retornar a propriedade quando for encontrada", async () => {
    const property = await propertyRepository.save(
      new Property("123456", "nome", "descrição", 1, 100, []),
    );

    const property_on_db = await propertyRepository.findById(property.getId());

    expect(property_on_db).toBeDefined();
    expect(property_on_db?.getId()).toBe("123456");
    expect(property_on_db?.getName()).toBe("nome");
  });
});
