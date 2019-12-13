import { Document } from 'mongoose';

export interface Manufacturer extends Document {
	name: string,
	phone: string,
	siret: number
}
