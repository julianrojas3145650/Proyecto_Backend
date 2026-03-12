import { IsString, IsNumber, MinLength } from "class-validator";

export class CreateBarnDto {

  @IsString()
  @MinLength(2)
  code: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsNumber()
  maxBirdCapacity: number;

  @IsNumber()
  length: number;

}