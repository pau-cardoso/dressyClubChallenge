import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [CarsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
