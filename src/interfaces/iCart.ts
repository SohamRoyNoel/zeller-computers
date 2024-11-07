import { Product } from "./iProduct";

export interface Cart {
    items: Product[];
    total: number;
}