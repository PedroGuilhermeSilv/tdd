import { Repository } from "typeorm";
import { Booking } from "../../domain/entities/booking";
import { IBookingRepository } from "../../domain/entities/repositories/booking_repository";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { BookingMapper } from "../persistence/mappers/booking_mapper";

export class TypeOrmBookingRepository implements IBookingRepository {
  private readonly repository: Repository<BookingEntity>;
  constructor(repository: Repository<BookingEntity>) {
    this.repository = repository;
  }

  async save(booking: Booking): Promise<Booking> {
    const bookingEntity = BookingMapper.toEntity(booking);
    await this.repository.save(bookingEntity);
    return booking;
  }

  async findById(id: string): Promise<Booking | null> {
    const bookingEntity = await this.repository.findOne({
      where: { id },
      relations: ["property", "guest"],
    });

    if (!bookingEntity) return null;
    return BookingMapper.toDomain(bookingEntity);
  }
}
