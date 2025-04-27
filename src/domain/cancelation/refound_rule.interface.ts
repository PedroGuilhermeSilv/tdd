export interface IRefundRule {
    calculateRefund(totalPrice: number): number;
}
