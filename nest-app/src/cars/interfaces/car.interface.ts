import { Document  } from 'mongoose';
import { Manufacturer } from './manufacturer.interface';
import { Owner } from './owner.interface';

export interface Car extends Document {
	price: number,
	manufacturer: Manufacturer,
	firstRegistration?: Date,
	owners?: Array<Owner>
}
