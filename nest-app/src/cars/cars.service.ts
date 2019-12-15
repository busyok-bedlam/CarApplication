import { Injectable } from '@nestjs/common';
import { Model  } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './interfaces/car.interface';
import { Owner } from './interfaces/owner.interface';
import { Manufacturer } from './interfaces/manufacturer.interface'
import * as mongoose from 'mongoose';
import * as moment from 'moment';


@Injectable()
export class CarsService {
	constructor(
		@InjectModel('Car') private readonly carModel: Model<Car>, 
		@InjectModel('Owner') private readonly ownerModel: Model<Owner>,
		@InjectModel('Manufacturer') private readonly manufacturerModel: Model<Manufacturer>
	){}

	async createCar(carInfo: Car): Promise<Car>{
		try {
			const { manufacturer } = carInfo;
			let existingManufacturer = await this.manufacturerModel.findOne({
				name: manufacturer.name
			})
			if(existingManufacturer) {
				const carModelData = { ...carInfo, manufacturer: existingManufacturer._id  }
				const car = await new this.carModel(carModelData).save();
				return car;
			} else {

				const newManufacturer = await new this.manufacturerModel({
					_id: new mongoose.Types.ObjectId(),
					...manufacturer
				});
				await newManufacturer.save();
				const carModelData = { ...carInfo, manufacturer: newManufacturer._id };
				const car = await new this.carModel()
				return car;
			}
		}
		catch(err) {
			throw err;	
		}
	}

	async findAllCars() {
		try {
			let cars = await this.carModel
				.find()
				.populate('manufacturer')
				.populate('owners');
			return cars;
		} 
		catch(err) {
			throw err;	
		}
	}

	async findOneCar(carID) {
		try {
			let car = await this.carModel
				.findById(carID)
				.populate('manufacturer')
				.populate('owners');
			return car;
		}
		catch(err) {
			throw err;
		}
	}

	async findManufacturerByCarId(carID) {
		try {
			let car = await this.carModel.findById(carID).populate('manufacturer');
			const { manufacturer } = car;
			return manufacturer;
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


	async registrateCar(id): Promise<Car> {
		try {
			const selectedCar = await this.carModel.findById(id);
			if(selectedCar) {
				if(!selectedCar.firstRegistration) {
					const updatedCar = await this.carModel.findByIdAndUpdate(id, { firstRegistration: new Date() })
					return updatedCar;
				} else {
					return selectedCar;
				}
			} else {
				throw new Error("No selected car");
			}
		}
		catch(err) {
			throw err;
		}
	}

	async updateCar(id, patch) {
		try {
			let updatedCar = await this.carModel.findByIdAndUpdate(id, { ...patch })
			return updatedCar;
		}
		catch(err) {

		}

	}

	async sellCar(id, owner: Owner) {
		try {
			const ownerID = new mongoose.Types.ObjectId()
			const newOwner = new this.ownerModel({
				_id: ownerID,
				...owner
			});
			await newOwner.save();
			const car = await this.carModel.findByIdAndUpdate(id, {$push: { owners: ownerID }});
			return car;

		}
		catch(err) {
			throw err;
		}
	}

	async removeOldOwners() {
		try {
			const before = moment().subtract(18, 'month');
			let ids = await this.ownerModel.find({
				purchaseDate: {
					$lt: new Date(+before),
				}
			}).select("_id")
			ids = ids.map(item => item._id);

			await this.carModel.updateMany({}, {
				$pull: {
					owners: {
						$in: ids
					}
				}
			})
			await this.ownerModel.deleteMany({
				'_id': {
					$in: ids
				}
			})
		}
		catch(err) {
			throw err;
		}
	} 

	async applyDiscountForCars(): Promise<any> {
		try {
			const upLimit = + moment().subtract(12, 'month');
			const downLimit = + moment().subtract(18, 'month');
			const discountResult = await this.carModel.updateMany(
				{
					firstRegistration: {
						$lt: new Date(upLimit),
						$gt: new Date(downLimit)
					}
				}, 
				{
					$mul: {
						price: 0.8
					}
				}
			)
			
			return discountResult;
		}
		catch(err) {
			throw err;
		}
	}
	async deleteAllCars(): Promise<any> {
		try {
			await this.carModel.deleteMany({});
			return {
				message: "sucess deleted all",
			}
			
		}
		catch(err) {
			throw err;
		}
	}
	
}
