import { randomUUID } from "crypto";
import { Booking } from "../../domain/entities/booking";
import { IBookingRepository } from "../../domain/entities/repositories/booking_repository";
import { DateRange } from "../../domain/value_objects/date_range";
import { CreateBookingDto } from "../dtos/create_booking_dto";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";

export class BookingService {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly propertyService: PropertyService,
    private readonly userService: UserService,
  ) {}
  async createBooking(dto: CreateBookingDto): Promise<Booking> {
    const property = await this.propertyService.getPropertyById(dto.propertyId);
    if (!property) {
      throw new Error("Propiedade não encontrada");
    }

    const guest = await this.userService.getUserById(dto.guestId);
    if (!guest) {
      throw new Error("Hospede não encontrado");
    }

    const dateRange = new DateRange(dto.startDate, dto.endDate);

    return await this.bookingRepository.save(
      new Booking(randomUUID(), property, guest, dateRange, dto.guestCount),
    );
  }

  async cancelBooking(bookingId: string): Promise<void> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new Error("Reserva não encontrada");
    }
    booking.cancel(new Date());
    await this.bookingRepository.save(booking);
  }
}
