import { IsString, IsNumber, MinLength } from "class-validator";

export class CreateBarnDto {

  @IsString()
  @MinLength(2)
  codigo: string;

  @IsString()
  @MinLength(2)
  nombre: string;

  @IsNumber()
  capacidad_max_aves: number;

  @IsNumber()
  longitud: number;

}