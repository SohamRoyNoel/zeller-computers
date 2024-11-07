import { Cart } from "./iCart";

export interface PricingRule {
    condition: (cart: Cart) => boolean;
    apply: (cart: Cart) => void;
}