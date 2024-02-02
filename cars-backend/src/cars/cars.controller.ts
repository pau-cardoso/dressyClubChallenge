import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { CarsService } from './cars.service';
import { Car } from './schemas/car.schema';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.createCar(createCarDto);
  }

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }
}
