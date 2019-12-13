import { Schema } from 'mongoose';

export const OwnerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	purchaseDate: {
		type: Date,
		required: false
	}
})
