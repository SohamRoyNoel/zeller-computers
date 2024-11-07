import { Checkout } from "./checkout";
import { pricingRules } from "./pricingRule";
import * as readline from 'readline';

const co = new Checkout(pricingRules);

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const scanNext = () => {
    rl.question('Enter SKU to scan (or type "c" to finish): ', (input: string) => {
      if (input.toLowerCase() === 'c') {
        console.log(`Total: $${co.total().toFixed(2)}`);
        rl.close();
      } else {
        co.scan(input.toLowerCase());
        console.log(`scanned. Total: $${co.total().toFixed(2)}`);
        scanNext();
      }
    });
  };

  scanNext();
};

main();