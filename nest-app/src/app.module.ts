import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ServeStaticModule  } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose'

import { join } from 'path';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://mongo:27017/cars-db'),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'documentation'),
		}),
		CarsModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
