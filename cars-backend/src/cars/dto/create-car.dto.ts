import { Brand } from 'src/brands/schemas/brand.schema';
import { Color } from 'src/colors/schemas/color.schema';

export class CreateCarDto {
  model: string;
  brand: Brand;
  color: Color;
  value: number;
  production_cost: number;
  transportation_cost: number;
}
