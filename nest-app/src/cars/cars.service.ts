import { Injectable } from '@nestjs/common';
import { Model  } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CarInterface } from './interfaces/car.interface';


@Injectable()
export class CarsService {
	constructor(@InjectModel('Car') private readonly carModel: Model<CarInterface>){}

	async createCar(carInfo: CarInterface){
		try {
			let car = await new this.carModel(carInfo).save();	
			return car;
		}
		catch(err) {
			throw err;	
		}
	}
	async findAllCars() {
		try {
			let cars = await this.carModel.find({});
			return cars;
		} 
		catch(err) {
			throw err;	
		}
	}

	async deleteCarByID(id) {
		try {
			const deletedCar = await this.carModel.deleteOne({ "_id": id });
			return deletedCar;
		}
		catch(err) {
			throw err;
		}
	}

	async deleteCarByParams(params) {
		try {
			const deletedCar = await this.carModel.deleteOne({ ...params });
			return deletedCar;
		}
		catch(err) {
			throw err;
		}
	}

	async updateCar(id, patch) {
		try {
			let updatedCar = await this.carModel.update({"_id": id}, { ...patch })
			return updatedCar;
		}
		catch(err) {

		}
		
	}



	async getManufacturerDataByCarsID() {
		
	}
	
	async deleteOldBuyOwner() {
		
	}

	async applyDiscountForCars() {

	}
}
