import { Booking } from "../../domain/entities/booking";
import { FakeBookingRepository } from "../../infrastructure/fake_booking_repository";
import { CreateBookingDto } from "../dtos/create_booking_dto";
import { BookingService } from "./booking_service";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";

jest.mock("./property_service");
jest.mock("./user_service");

describe("BookingService", () => {
  let bookingService: BookingService;
  let fakeBookingRepository: FakeBookingRepository;
  let mockPropertyService: jest.Mocked<PropertyService>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    const mockPropertyRespoitory = {} as any;
    const mockUserRespository = {} as any;

    mockPropertyService = new PropertyService(
      mockPropertyRespoitory,
    ) as jest.Mocked<PropertyService>;
    mockUserService = new UserService(
      mockUserRespository,
    ) as jest.Mocked<UserService>;

    fakeBookingRepository = new FakeBookingRepository();

    bookingService = new BookingService(
      fakeBookingRepository,
      mockPropertyService,
      mockUserService,
    );
  });

  it("deve criar uma reserva com sucesso usando o respositorio fake", async () => {
    const mockProperty = {
      getId: jest.fn().mockReturnValue("1"),
      isAvailable: jest.fn().mockReturnValue(true),
      validateGuestCount: jest.fn(),
      calculateTotalPrice: jest.fn().mockReturnValue(500),
      addBooking: jest.fn(),
    } as any;
    const mockUser = {
      getId: jest.fn().mockReturnValue("1"),
    } as any;

    mockPropertyService.getPropertyById.mockResolvedValue(mockProperty);
    mockUserService.getUserById.mockResolvedValue(mockUser);
    const bookingDto: CreateBookingDto = {
      propertyId: "1",
      guestId: "1",
      startDate: new Date("2024-12-20"),
      endDate: new Date("2024-12-25"),
      guestCount: 2,
    };

    const result = await bookingService.createBooking(bookingDto);

    expect(result).toBeInstanceOf(Booking);
    expect(result.getStatus()).toBe("CONFIRMED");
    expect(result.getTotalPrice()).toBe(500);

    const booking_on_db = await fakeBookingRepository.findById(result.getId());
    expect(booking_on_db?.getId()).toBe(result.getId());
  });

  it("deve lançar um erro se a propriedade não for encontrada", async () => {
    const mockUser = {
      getId: jest.fn().mockReturnValue("1"),
    } as any;

    mockUserService.getUserById.mockResolvedValue(mockUser);
    mockPropertyService.getPropertyById.mockResolvedValue(null);
    const bookingDto: CreateBookingDto = {
      propertyId: "1",
      guestId: "1",
      startDate: new Date("2024-12-20"),
      endDate: new Date("2024-12-25"),
      guestCount: 2,
    };

    await expect(bookingService.createBooking(bookingDto)).rejects.toThrow(
      "Propiedade não encontrada",
    );
  });

  it("deve lançar um erro se o hospede não for encontrado", async () => {
    const mockProperty = {
      getId: jest.fn().mockReturnValue("1"),
      isAvailable: jest.fn().mockReturnValue(true),
      validateGuestCount: jest.fn(),
      calculateTotalPrice: jest.fn().mockReturnValue(500),
      addBooking: jest.fn(),
    } as any;

    mockPropertyService.getPropertyById.mockResolvedValue(mockProperty);
    const bookingDto: CreateBookingDto = {
      propertyId: "1",
      guestId: "1",
      startDate: new Date("2024-12-20"),
      endDate: new Date("2024-12-25"),
      guestCount: 2,
    };

    await expect(bookingService.createBooking(bookingDto)).rejects.toThrow(
      "Hospede não encontrado",
    );
  });

  it("deve cancelar uma reserva existente usando o respositorio fake", async () => {
    const mockProperty = {
      getId: jest.fn().mockReturnValue("1"),
      isAvailable: jest.fn().mockReturnValue(true),
      validateGuestCount: jest.fn(),
      calculateTotalPrice: jest.fn().mockReturnValue(500),
      addBooking: jest.fn(),
    } as any;
    const mockUser = {
      getId: jest.fn().mockReturnValue("1"),
    } as any;

    mockPropertyService.getPropertyById.mockResolvedValue(mockProperty);
    mockUserService.getUserById.mockResolvedValue(mockUser);
    const bookingDto: CreateBookingDto = {
      propertyId: "1",
      guestId: "1",
      startDate: new Date("2024-12-20"),
      endDate: new Date("2024-12-25"),
      guestCount: 2,
    };

    const result = await bookingService.createBooking(bookingDto);

    await bookingService.cancelBooking(result.getId());

    const booking_on_db_after_cancel = await fakeBookingRepository.findById(
      result.getId(),
    );
    expect(booking_on_db_after_cancel?.getStatus()).toBe("CANCELLED");
  });

  it("deve lançar um erro se a reserva não for encontrada", async () => {
    await expect(bookingService.cancelBooking("1")).rejects.toThrow(
      "Reserva não encontrada",
    );
  });
});
