import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { Color } from './schemas/color.schema';
import { CreateColorDto } from './dto/create-color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.createColor(createColorDto);
  }

  @Get()
  async findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }
}
