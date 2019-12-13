import { HttpException, Controller, Get, Post, Put, Delete, Request,Res, Body, Patch, Query, Param, HttpStatus } from '@nestjs/common';
import { Response  } from 'express';

import { Car } from './interfaces/car.interface';
import { CarDto } from './dto/car.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
	constructor(private readonly carService: CarsService){}
	@Get()
	async findAll(@Res() res, @Query() query): Promise<any>{
		try {
			let cars = await this.carService.findAllCars();
			res.status(HttpStatus.OK).json({cars});
		}
		catch(err) {
			throw err;	
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
	async createCar(@Body() carBody, @Res() res: Response){
		try {
			const car = await this.carService.createCar(carBody);
			res.status(HttpStatus.CREATED).json({
				car
			})
		}
		catch(err) {
			throw err;
		}
	}

	@Patch(':id')
	async changeCarFields(@Param() params, @Body() patchBody, @Res() res: Response){
		try {
			if(params.id) {
				const updatedCar = await this.carService.updateCar(params.id, patchBody);
				res.status(HttpStatus.OK).json({
					updatedCar
				})
			} else {
				throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);	
			}

		}
		catch(err) {
			throw err;
		}
		return ('CHANGE CAR');
	}

	@Delete()
	async deleteCarByParams(@Body() deleteParams, @Res() res: Response) {
		try {
			const deletedCar = await this.carService.deleteCarByParams(deleteParams);
			res.status(HttpStatus.OK).json({
				deletedCar
			})
		}
		catch(err) {
			throw err;
		}
	}

	@Delete(':id')
	async deleteCarById(@Param() params, @Res() res: Response) {
		try {
			if(params.id) {
				const deletedCar = await this.carService.deleteCarByID(params.id);
				res.status(HttpStatus.OK).json({
					deletedCar
				})
			} 
		}
		catch(err) {
			throw err;
		}
	}
}
