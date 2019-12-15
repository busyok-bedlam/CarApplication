import { Schema } from 'mongoose';
import { CarSchema } from './car.schema';

export const OwnerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	purchaseDate: {
		type: Date,
		required: true,
		default: new Date()
	}
})

