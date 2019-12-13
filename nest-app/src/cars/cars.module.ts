import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/car.schema';
import { OwnerSchema } from './schemas/owner.schema';
import { ManufacturerSchema} from './schemas/manufacturer.schema';

@Module({
	imports: [MongooseModule.forFeature([
		{ name: 'Car', schema: CarSchema },
		{ name: 'Owner', schema: OwnerSchema },
		{ name: 'Manufacturer', schema: ManufacturerSchema }
	])],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
