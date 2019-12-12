import { Controller, Get, Post, Put, Delete, Request, Body, Patch } from '@nestjs/common';

@Controller('cars')
export class CarsController {
	@Get()
	async findAll(): Promise<any>{
		return 'GET ALL CARS';
	}

	@Get(':id')
	async findCarById(id): Promise<any> {
		return 'GET ONE CAR';
	}

	@Post()
	async createCar(){
		console.log('CREATE CAR');
	}

	@Patch(':id')
	async changeCarFields(id){
		console.log('CHANGE CAR');
	}

	@Delete(':id')
	async deleteCarById(id) {
		console.log('DELETE CAR BY ID')
	}


}
