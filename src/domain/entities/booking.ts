import { RefundRuleFactory } from "../cancelation/refound_rule_factory";
import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
  private readonly id: string;
  private readonly guest: User;
  private readonly property: Property;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private status: "CONFIRMED" | "CANCELLED" = "CONFIRMED";
  private totalPrice: number;

  constructor(
    id: string,
    property: Property,
    guest: User,
    dateRange: DateRange,
    guestCount: number,
  ) {
    if (guestCount <= 0) {
      throw "O número de hóspedes deve ser maior que 0";
    }
    if (!property.isAvailable(dateRange)) {
      throw "A propriedade não está disponível para o período selecionado";
    }
    property.validateGuestCount(guestCount);
    this.id = id;
    this.property = property;
    this.guest = guest;
    this.dateRange = dateRange;
    this.guestCount = guestCount;

    property.addBooking(this);
    this.totalPrice = property.calculateTotalPrice(dateRange);
  }

  getId(): string {
    return this.id;
  }
  getProperty(): Property {
    return this.property;
  }
  getUser(): User {
    return this.guest;
  }
  getDateRange(): DateRange {
    return this.dateRange;
  }
  getGuestCount(): number {
    return this.guestCount;
  }

  getGuest(): User {
    return this.guest;
  }
  getStatus(): string {
    return this.status;
  }
  setStatus(status: "CONFIRMED" | "CANCELLED"): void {
    this.status = status;
  }
  getTotalPrice(): number {
    return this.totalPrice;
  }
  cancel(currentDate: Date): void {
    if (this.status === "CANCELLED") {
      throw "A reserva já foi cancelada";
    }

    const diffTime =
      this.dateRange.getStartDate().getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const refundRule = RefundRuleFactory.getRefundRule(diffDays);
    this.totalPrice = refundRule.calculateRefund(this.totalPrice);
    this.status = "CANCELLED";
  }
}
