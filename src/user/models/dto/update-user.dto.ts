import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(5, 80)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
