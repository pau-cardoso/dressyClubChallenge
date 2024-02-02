import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from 'src/brands/schemas/brand.schema';
import { Color } from 'src/colors/schemas/color.schema';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop()
  model: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color' })
  color: Color;

  @Prop()
  value: number;

  @Prop()
  production_cost: number;

  @Prop()
  transportation_cost: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
