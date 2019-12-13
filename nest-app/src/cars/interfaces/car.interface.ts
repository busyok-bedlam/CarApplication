import { Document  } from 'mongoose';

export interface CarInterface extends Document {
	price: number,
	manufacturer: boolean,
	firstRegistration: Date,
	owners: Array<number>
}
