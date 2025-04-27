import { IRefundRule } from "./refound_rule.interface";

export class NoRefund implements IRefundRule {
    calculateRefund(totalPrice: number): number {
        return totalPrice;
    }
}