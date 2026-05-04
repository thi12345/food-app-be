import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateUserDto {
    @IsNotEmpty({message:'Name can not be empty'})
    name: string;
    @IsNotEmpty({message:'Email can not be empty'})
    @IsEmail()
    email: string;
    password: string;
    phone: string;
    address: string;
    image: string;
}
