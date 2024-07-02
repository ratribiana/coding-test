import { IsEmail, IsNotEmpty, IsString, IsArray, IsNumber, IsMongoId, IsOptional } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsOptional()
  @IsMongoId()
  public _id?: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  public age?: number;

  @IsArray()
  public tags?: Array<string>;
}
