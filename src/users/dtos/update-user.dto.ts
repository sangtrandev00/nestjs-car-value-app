import { IsEmail, IsInt, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
