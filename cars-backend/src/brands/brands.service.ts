import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel('Brand') private readonly brandModel: Model<Brand>,
  ) {}

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const createdBrand = await this.brandModel.create(createBrandDto);
    return createdBrand;
  }

  findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async initializeBrands() {
    const count = await this.brandModel.countDocuments();
    if (count === 0) {
      await this.brandModel.create({ name: 'Toyota' });
      await this.brandModel.create({ name: 'Ford' });
      await this.brandModel.create({ name: 'Honda' });
      await this.brandModel.create({ name: 'Chevy' });
      await this.brandModel.create({ name: 'Volkswagen' });
    }
  }
}
