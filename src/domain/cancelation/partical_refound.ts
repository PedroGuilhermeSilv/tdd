import { IRefundRule } from "./refound_rule.interface";


export class ParticalRefund implements IRefundRule {
    calculateRefund(totalPrice: number): number {
        return totalPrice * 0.5;
    }
}

