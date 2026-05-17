import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { Column } from "typeorm";

export class CreateUserDto {
    @IsNotEmpty({message:'Name can not be empty'})
    name: string;
    @IsNotEmpty({message:'Email can not be empty'})
    @IsEmail()
    email: string;
    @IsNotEmpty({message:'Password can not be empty'})
    password: string;
    @IsOptional()
    phone: string;
    @IsOptional()
    address: string;
    @IsOptional()
    image: string;
}
