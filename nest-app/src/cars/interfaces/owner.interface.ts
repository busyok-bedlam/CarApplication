import { Document } from 'mongoose';

export interface Owner extends Document {
	name: string,
	purchaseData?: Date
}
