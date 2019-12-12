import { IsString, IsNotEmpty } from "class-validator";



export class CarDto {
	@IsString()
	@IsNotEmpty()
	id: string;
	
	@IsString()
	manufacturer: string;
}
