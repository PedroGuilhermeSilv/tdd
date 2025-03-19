import { DateRange } from '../value_objects/date_range';
import { Property } from './property';
describe('Property entity', () => {
    it('should create a property', () => {
        const property = new Property('1', 'Casa na praia', 'Uma bela casa na praia', 4, 200);
        expect(property).toBeDefined();

        expect(property.getId()).toBe('1');
        expect(property.getName()).toBe('Casa na praia');
        expect(property.getDescription()).toBe('Uma bela casa na praia');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

    it("Deve lançar um error se nome for vazio", () => {
        expect(() => new Property('1', '', 'Uma bela casa na praia', 4, 200)).toThrow('Nome não pode ser vazio');
    });

    it("Deve lançar um error se o preço base por noite for zero ", () => {
        expect(() => new Property('1', 'Casa na praia', 'Uma bela casa na praia', 4, 0)).toThrow('Preço base por noite não pode ser vazio');
    });

    it("Deve lançar um error se a quantidade de hóspedes for zero", () => {
        expect(() => new Property('1', 'Casa na praia', 'Uma bela casa na praia', 0, 200)).toThrow('Quantidade de hóspedes não pode ser vazia');
    });
    it("Deve validar o número máximo de hóspedes", () => {
        const property = new Property('1', 'Casa na praia', 'Uma bela casa na praia', 1000, 200);
        expect(() => property.validateGuestCount(1001)).toThrow('Quantidade de hóspedes não pode ser maior que 1000');
    });
    it("não deve aplicar desconto para estadias menore que 7 dias", () => {
        const property = new Property('1', 'Casa na praia', 'Uma bela casa na praia', 2, 100);
        const dateRange = new DateRange(new Date('2024-01-10'), new Date('2024-01-15'));
        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(500);
    });
    it("deve aplicar desconto para estadias maiores que 7 noites ou mais", () => {
        const property = new Property('1', 'Casa na praia', 'Uma bela casa na praia', 2, 100);
        const dateRange = new DateRange(new Date('2024-01-10'), new Date('2024-01-17'));
        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(630);
    });
});
