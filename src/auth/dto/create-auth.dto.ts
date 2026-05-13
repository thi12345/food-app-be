import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {

  @IsNotEmpty({ message: 'Email can not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  password: string;

  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;
}
