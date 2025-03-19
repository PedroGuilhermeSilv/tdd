import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

export class Property {
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private maxGuests: number,
        private basePricePerNight: number,
        private bookings: Booking[] = []
    ) {
        this.validate();
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxGuests = maxGuests;
        this.basePricePerNight = basePricePerNight;



    }


    private validate(): void {
        if (!this.id) {
            throw new Error('Id não pode ser vazio');
        }

        if (!this.name) {
            throw new Error('Nome não pode ser vazio');
        }

        if (!this.description) {
            throw new Error('Descrição não pode ser vazia');
        }

        if (!this.maxGuests || this.maxGuests <= 0) {
            throw new Error('Quantidade de hóspedes não pode ser vazia');
        }

        if (!this.basePricePerNight || this.basePricePerNight <= 0) {
            throw new Error('Preço base por noite não pode ser vazio');
        }
    }
    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getMaxGuests(): number {
        return this.maxGuests;
    }

    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }
    validateGuestCount(guestCount: number): void {
        if (guestCount > this.maxGuests) {
            throw new Error('Quantidade de hóspedes não pode ser maior que ' + this.maxGuests);
        }
    }

    calculateTotalPrice(dateRange: DateRange): number {
        if (dateRange.getTotalDays() < 7) {
            return this.basePricePerNight * dateRange.getTotalDays();
        }
        return this.basePricePerNight * dateRange.getTotalDays() * 0.9;
    }


    isAvailable(dateRange: DateRange): boolean {
        return !this.bookings.some(
            (booking) => booking.getStatus() === "CONFIRMED" &&
                booking.getDateRange().isOverlapping(dateRange))
    }

    addBooking(booking: Booking): void {
        this.bookings.push(booking)
    }

    getBookings(): Booking[] {
        return [...this.bookings]
    }
}