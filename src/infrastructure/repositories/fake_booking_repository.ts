import { Booking } from "../../domain/entities/booking";
import { IBookingRepository } from "../../domain/entities/repositories/booking_repository";

export class FakeBookingRepository implements IBookingRepository {
  private bookings: Booking[] = [];
  async findById(id: string): Promise<Booking | null> {
    return this.bookings.find((booking) => booking.getId() === id) || null;
  }
  async save(booking: Booking): Promise<Booking> {
    this.bookings.push(booking);
    return booking;
  }
}
