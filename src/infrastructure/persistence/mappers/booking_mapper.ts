import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyMapper } from "./property_mapper";
import { UserMapper } from "./user_mapper";

export class BookingMapper {
  static toDomain(bookingEntity: BookingEntity, property?: Property): Booking {
    const guest = UserMapper.toDomain(bookingEntity.guest);
    const dateRange = new DateRange(
      bookingEntity.startDate,
      bookingEntity.endDate,
    );

    const booking = new Booking(
      bookingEntity.id,
      property ?? PropertyMapper.toDomain(bookingEntity.property),
      guest,
      dateRange,
      bookingEntity.guestCount,
    );
    return booking;
  }

  static toEntity(booking: Booking): BookingEntity {
    const bookingEntity = new BookingEntity();
    bookingEntity.id = booking.getId();
    bookingEntity.property = PropertyMapper.toEntity(booking.getProperty());
    bookingEntity.guest = UserMapper.toEntity(booking.getGuest());
    bookingEntity.startDate = booking.getDateRange().getStartDate();
    bookingEntity.endDate = booking.getDateRange().getEndDate();
    bookingEntity.guestCount = booking.getGuestCount();
    bookingEntity.status = booking.getStatus() as "CONFIRMED" | "CANCELLED";
    bookingEntity.totalPrice = booking.getTotalPrice();
    return bookingEntity;
  }
}
