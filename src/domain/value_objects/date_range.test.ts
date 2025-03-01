
import { DateRange } from './date_range';

describe('DateRange Value Object', () => {
    it('deve criar um range de datas e retornar as datas', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-05');
        const dateRange = new DateRange(startDate, endDate);
        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
        expect(dateRange).toBeInstanceOf(DateRange);
    });
    it('deve lançar um error se a data de termino for antes da data de inicio', () => {
        expect(() => new DateRange(new Date('2024-01-05'), new Date('2024-01-01'))).toThrow('Data de termino não pode ser antes da data de inicio');
    });

    it('deve calcular a duração do range de datas', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-05');
        const dateRange = new DateRange(startDate, endDate);
        expect(dateRange.getTotalDays()).toEqual(4);
    });
});