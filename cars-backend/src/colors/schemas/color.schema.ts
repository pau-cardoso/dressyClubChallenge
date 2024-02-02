import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColorDocument = HydratedDocument<Color>;

@Schema()
export class Color {
  @Prop()
  name: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
