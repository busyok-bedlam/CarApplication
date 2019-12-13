import { Document  } from 'mongoose';

export interface Car extends Document {
	price: number,
	manufacturer: boolean,
	firstRegistration?: Date,
	owners?: Array<number>
}
