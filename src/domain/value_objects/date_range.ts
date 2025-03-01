export class DateRange {
    constructor(
        private readonly startDate: Date,
        private readonly endDate: Date
    ) {
        if (endDate < startDate) {
            throw new Error('Data de termino não pode ser antes da data de inicio');
        }
    }
    getStartDate(): Date {
        return this.startDate;
    }
    getEndDate(): Date {
        return this.endDate;
    }
    getTotalDays(): number {
        const timeDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}