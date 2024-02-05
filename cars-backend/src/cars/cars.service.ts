import { Injectable } from '@nestjs/common';
import { Car } from './schemas/car.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  private readonly cars: Car[] = [];

  async createCar(createCarDto: CreateCarDto) {
    const createdCar = new this.carModel(createCarDto);
    const car = await createdCar.save();
    return car;
  }

  findAll(): Promise<Car[]> {
    return this.carModel
      .find()
      .populate('brand', 'name')
      .populate('color', 'name')
      .exec();
  }
}
