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
}
