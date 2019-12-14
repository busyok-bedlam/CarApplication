import { Schema } from 'mongoose';

export const CarSchema = new Schema({
	price: {
		type: String,
		required: true
	},
	manufacturer: {
		type: Schema.Types.ObjectId,
		ref: 'Manufacturer',
		required: true
	},
	firstRegistration: {
		type: Date
	},
	owners: [{ type: Schema.Types.ObjectId, ref: 'Owner' }]
})
