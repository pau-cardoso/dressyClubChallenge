import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {
    brandService.initializeBrands();
  }

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }
}
