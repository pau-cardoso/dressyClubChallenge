import { Brand } from "./Brand";
import { Color } from "./Color";

export interface Car {
  _id: string;
  model: string;
  brand: Brand;
  color: Color;
  value: number;
  production_cost: number;
  transportation_cost: number;
}