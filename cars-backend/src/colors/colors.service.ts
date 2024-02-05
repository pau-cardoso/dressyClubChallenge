import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from './schemas/color.schema';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel('Color') private readonly colorModel: Model<Color>,
  ) {}

  async createColor(createColorDto: CreateColorDto): Promise<Color> {
    const createdColor = await this.colorModel.create(createColorDto);
    return createdColor;
  }

  findAll(): Promise<Color[]> {
    return this.colorModel.find().exec();
  }

  async initializeColors() {
    const count = await this.colorModel.countDocuments();
    if (count === 0) {
      await this.colorModel.create({ name: 'Blue' });
      await this.colorModel.create({ name: 'Red' });
      await this.colorModel.create({ name: 'Yellow' });
      await this.colorModel.create({ name: 'Black' });
      await this.colorModel.create({ name: 'White' });
    }
  }
}
