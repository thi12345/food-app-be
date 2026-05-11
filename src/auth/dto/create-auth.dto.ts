import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username can not be empty' })
  @MaxLength(100, { message: 'Username must not be longer than 100 characters' })
  @Matches(/^([^\s@]+@[^\s@]+\.[^\s@]+|\+?[0-9][0-9\s().-]{7,19})$/, {
    message: 'Username must be a valid email or phone number',
  })
  username: string;

  // @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password can not be empty' })
  // @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/\S/, { message: 'Password can not be blank' })
  password: string;
}
