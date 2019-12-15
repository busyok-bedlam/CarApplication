import { HttpException, Controller, Get, Post, Put, Delete, Request,Res, Body, Patch, Query, Param, HttpStatus } from '@nestjs/common';
import { Response  } from 'express';

import { Car } from './interfaces/car.interface';
import { Owner } from './interfaces/owner.interface';
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
	async findOneCar(@Param() params, @Query() query, @Res() res: Response): Promise<any> {
		try {
			const { id } = params;
			if(query.onlymanufacturer) {
				const manufacturer = await this.carService.findManufacturerByCarId(id);
				res.status(HttpStatus.OK).json(manufacturer);
			} else {
				const car = this.carService.findOneCar(id);
				res.status(HttpStatus.OK).json({
					car,
				})
			}	

		}
		catch(err) {
			throw err;
		}
	}

	@Post()
	async createCar(@Body() carBody: Car, @Res() res: Response){
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
	}

	@Put(':id/registration')
	async registrateCar(@Param() params, @Res() res: Response) {
		try {
			const { id } = params;
			const registratedCar = await this.carService.registrateCar(id);
			res.status(HttpStatus.OK).json({
				registratedCar
			})
		}
		catch(err) {
			throw err;
		}
	}

	@Patch(':id/sale')
	async sellCar(@Param() params, @Body() ownerBody: Owner, @Res() res: Response) {
		try {
			const { id } = params;
			const selledCar = await this.carService.sellCar(id, ownerBody);
			res.status(HttpStatus.OK).json({
				selledCar
			})
		}
		catch(err) {
			throw err;
		}
	}

	@Post('refresh')
	async refreshCarsInfo(@Res() res: Response) {
		try {
			await this.carService.removeOldOwners();
			await this.carService.applyDiscountForCars();
			res.status(HttpStatus.OK).json({
				message: "sucess refresh cars info",
			})
		}
		catch(err) {
			throw err;
		}
	}

	@Delete()
	async deleteAllCars(@Body() deleteParams, @Res() res: Response) {
		try {
			const result = await this.carService.deleteAllCars();
			res.status(HttpStatus.OK).json({
				result,
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
