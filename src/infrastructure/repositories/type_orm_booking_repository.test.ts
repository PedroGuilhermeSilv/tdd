import { DataSource, Repository } from "typeorm";
import { Booking } from "../../domain/entities/booking";
import { Property } from "../../domain/entities/property";
import { User } from "../../domain/entities/user";
import { DateRange } from "../../domain/value_objects/date_range";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeOrmBookingRepository } from "./type_orm_booking_repository";

describe("TypeOrmBookingRepository", () => {
  let dataSource: DataSource;
  let bookingRepository: TypeOrmBookingRepository;
  let repository: Repository<BookingEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity, UserEntity, BookingEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(BookingEntity);
    bookingRepository = new TypeOrmBookingRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve criar uma reserva com sucesso", async () => {
    const propertyRepository = dataSource.getRepository(PropertyEntity);
    const property_on_db = await propertyRepository.create({
      id: "123456",
      name: "nome",
      description: "descrição",
      maxGuests: 1,
      basePricePerNight: 100,
    });
    await propertyRepository.save(property_on_db);

    const userRepository = dataSource.getRepository(UserEntity);
    const user_on_db = await userRepository.create({
      id: "123456",
      name: "nome",
    });
    await userRepository.save(user_on_db);

    const user = new User(user_on_db.id, user_on_db.name);
    const property = new Property(
      property_on_db.id,
      property_on_db.name,
      property_on_db.description,
      property_on_db.maxGuests,
      property_on_db.basePricePerNight,
      [],
    );
    const dateRange = new DateRange(
      new Date("2025-01-01"),
      new Date("2025-01-02"),
    );
    const booking = new Booking("12", property, user, dateRange, 1);

    await bookingRepository.save(booking);
    const booking_on_db = await bookingRepository.findById("12");

    expect(booking_on_db).not.toBeNull();
    expect(booking_on_db!.getId()).toBe("12");
    expect(booking_on_db?.getProperty().getId()).toBe("123456");
    expect(booking_on_db?.getGuest().getId()).toBe("123456");
  });
});
