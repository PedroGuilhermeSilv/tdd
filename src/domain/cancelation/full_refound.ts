import { IRefundRule } from "./refound_rule.interface";

export class FullRefund implements IRefundRule {
    calculateRefund(totalPrice: number): number {
        return 0;
    }
}