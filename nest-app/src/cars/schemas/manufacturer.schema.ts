import { Schema } from 'mongoose';

export const ManufacturerSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	phone: {
		type: String,
		unique: true,
		required: true,
	},
	siret: {
		type: Number,
		required: true,
		unique: true
	}
})
