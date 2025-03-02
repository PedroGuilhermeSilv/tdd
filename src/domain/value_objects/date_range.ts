export class DateRange {
    constructor(
        private readonly startDate: Date,
        private readonly endDate: Date
    ) {
        this.validateDates(startDate, endDate);
        this.startDate = startDate;
        this.endDate = endDate;
    }

    private validateDates(startDate: Date, endDate: Date): void {
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

    isOverlapping(other: DateRange): boolean {
        return this.startDate <= other.endDate && this.endDate >= other.startDate;
    }
}