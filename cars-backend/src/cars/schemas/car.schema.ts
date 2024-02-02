import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop()
  model: string;

  @Prop()
  brand: string;

  @Prop()
  color: string;

  @Prop()
  value: number;

  @Prop()
  production_cost: number;

  @Prop()
  transportation_cost: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
