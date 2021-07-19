import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
