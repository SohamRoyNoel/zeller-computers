import { catalog } from "./catalog";
import { Cart } from "./interfaces/iCart";
import { PricingRule } from "./interfaces/iPricing";

export class Checkout {
    private cart: Cart;
    private pricingRules: PricingRule[];
  
    constructor(pricingRules: PricingRule[]) {
      this.cart = { items: [], total: 0 };
      this.pricingRules = pricingRules;
    }
  
    scan(sku: string): void {
      const product = catalog[sku];
      if (product) {
        this.cart.items.push(product);
        this.calculateTotal();
      } else {
        console.log(`Product ${sku} not found.`);
      }
    }
  
    private calculateTotal(): void {
      this.cart.total = this.cart.items.reduce((acc, product) => acc + product.price, 0);
  
      this.pricingRules.forEach(rule => {
        if (rule.condition(this.cart)) {
          rule.apply(this.cart);
        }
      });
    }
  
    total(): number {
      return this.cart.total;
    }
}