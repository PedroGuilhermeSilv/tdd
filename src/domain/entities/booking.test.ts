import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";
import { Property } from "./property";
import { User } from "./user";
describe("Booking entity", () => {
  it("deve criar uma instância de Booking com todos os atributos", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 100);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);
    expect(booking.getId()).toBe("1");
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getGuestCount()).toBe(2);
  });

  it("Deve verificar disponibilidade da propriedade", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 100);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25"),
    );
    const dateRange2 = new DateRange(
      new Date("2024-12-22"),
      new Date("2024-12-27"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(property.isAvailable(dateRange)).toBe(false);
    expect(property.isAvailable(dateRange2)).toBe(false);
  });

  it("deve lançar um erro se o número de hóspedes for zero ou negatico", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 100);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25"),
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 0);
    }).toThrow("O número de hóspedes deve ser maior que 0");
  });

  it("deve lançar um erro se o número de hóspedes for maior que a capacidade", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 100);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25"),
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 5);
    }).toThrow("Quantidade de hóspedes não pode ser maior que 4");
  });

  it("deve calcular o preço total com desconto", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 300);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(booking.getTotalPrice()).toBe(300 * 9 * 0.9);
  });

  it("não deve realizar o agendamento quando a propriedade não estiver disponível", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 300);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(() => {
      new Booking("2", property, user, dateRange, 2);
    }).toThrow("A propriedade não está disponível para o período selecionado");
  });

  it("deve cancelar uma reserva sem reembolso quando faltam menos de 1 dia para o check-in", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 300);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);
    const currentDate = new Date("2024-12-01");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(300 * 9 * 0.9);
  });

  it("deve cancelar uma reserva com reembolso quando faltam menos de 7 dias para o check-in", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 300);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);
    const currentDate = new Date("2024-11-20");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(0);
  });

  it("deve cancelar uma reserva com reembolso parcial quando tive entre 1 e 7 dias para o check-in", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 300);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);
    const currentDate = new Date("2024-11-30");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(300 * 9 * 0.9 * 0.5);
  });

  it("não deve permitir cancelar uma reserva mais de uma vez", () => {
    const property = new Property("1", "Ccasa", "Descrição", 4, 300);
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10"),
    );

    const booking = new Booking("1", property, user, dateRange, 2);
    const currentDate = new Date("2024-11-30");
    booking.cancel(currentDate);

    expect(() => {
      booking.cancel(currentDate);
    }).toThrow("A reserva já foi cancelada");
  });
});
