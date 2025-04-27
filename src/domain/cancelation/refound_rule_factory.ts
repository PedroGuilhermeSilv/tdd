import { FullRefund } from "./full_refound";
import { NoRefund } from "./no_refound";
import { ParticalRefund } from "./partical_refound";
import { IRefundRule } from "./refound_rule.interface";

export class RefundRuleFactory {
    static getRefundRule(diffDays: number): IRefundRule {
        if (diffDays > 7) {
            return new FullRefund();
        }
        if (diffDays >= 1 && diffDays <= 7) {
            return new ParticalRefund();
        }
        return new NoRefund();
    }
}