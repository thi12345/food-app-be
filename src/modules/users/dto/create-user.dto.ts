import { IsEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateUserDto {
    @IsEmpty()
    name: string;


    email: string;

    password: string;

    phone: string;

    address: string;

    image: string;

    @Column({ default: 'USER' })
    role: string;

    @Column({ default: 'LOCAL' })
    accountType: string;


    isActive: string;

    codeId: string;

    codeExpired: Date;

    createdAt: Date;

    updatedAt: Date;
}
