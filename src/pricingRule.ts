import { catalog } from "./catalog";
import { PricingRule } from "./interfaces/iPricing";
// const c = require("")
import dotenv from 'dotenv';
dotenv.config();

const atvDiscountRule: PricingRule = {
    condition: (cart) => {
      const appleTVCount = cart.items.filter(item => item.sku === 'atv').length;
      return appleTVCount >= parseInt(process.env.ATV_DISCOUNT_MIN_LIMIT as string);
    },
    apply: (cart) => {
      // atv
      const appleTVCount = cart.items.filter(item => item.sku === 'atv').length;
      const pricePerAppleTV = catalog['atv'].price;
  
      // Calculate how many atv should be free
      const freeAppleTVs = Math.floor(appleTVCount / parseInt(process.env.ATV_DISCOUNT_MIN_LIMIT as string));
      const discount = freeAppleTVs * pricePerAppleTV;
  
      // discount amt
      cart.total -= discount;
    }
  };
  
  const ipdDiscountRule: PricingRule = {
    condition: (cart) => {
      const ipadCount = cart.items.filter(item => item.sku === 'ipd').length;
      console.log("=====> ", process.env.IPD_DISCOUNT_MIN_LIMIT);
      return ipadCount > parseInt(process.env.IPD_DISCOUNT_MIN_LIMIT as string);
    },
    apply: (cart) => {
      // > 4 ipd
      const discountedPrice = parseFloat(process.env.IPD_DISCOUNT_PRICE as string);
      const ipadCount = cart.items.filter(item => item.sku === 'ipd').length;
      const currentTotal = cart.items.filter(item => item.sku === 'ipd').reduce((acc, item) => acc + item.price, 0);
  
      // discount amount
      const discount = currentTotal - (ipadCount * discountedPrice);
      cart.total -= discount;
    }
};
  
export const pricingRules: PricingRule[] = [
    atvDiscountRule,
    ipdDiscountRule,
];