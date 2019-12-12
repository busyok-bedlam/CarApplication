import { Controller, Get, Post, Put, Delete, Request,Res, Body, Patch, Query, Param, HttpStatus } from '@nestjs/common';
import { CarDto } from './dto/car.dto';

@Controller('cars')
export class CarsController {
	@Get()
	async findAll(@Query() query): Promise<any>{
		if(query.ids) {
			if(query.ids.length > 0) {
				return query.ids.split(",");
			}
		}
	}

	@Get(':id')
	async findCarById(@Param() params): Promise<any> {
		return 'GET ONE CAR ' + params.id;
	}

	@Get(':id/manufacturer')
	async findManufacturerByCar(@Param() params): Promise<any> {
		return 'GET MANUFACTURER BY CAR ' + params.id;
	}

	@Post()
	async createCar(@Res() res){
		res.status(HttpStatus.CREATED).json({
			car: 'CAR'
		})
	}

	@Patch(':id')
	async changeCarFields(id){
		return ('CHANGE CAR');
	}

	@Delete(':id')
	async deleteCarById(id) {
		return ('DELETE CAR BY ID')
	}
}
