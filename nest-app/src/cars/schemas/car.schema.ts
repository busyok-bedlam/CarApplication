import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const CarSchema = new Schema({
	price: {
		type: String,
		required: true
	},
	manufacturer: {
		type: Boolean,
		required: true
	},
	firstRegistration: {
		type: Date,
		required: true,
		default:  new Date()
	},
	owners: [Number]
})
