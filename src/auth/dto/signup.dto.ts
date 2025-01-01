import { IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';


export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

   
}
