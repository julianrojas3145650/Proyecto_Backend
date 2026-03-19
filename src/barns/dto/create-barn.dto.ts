import { IsString, IsNumber, MinLength } from "class-validator";

export class CreateBarnDto {

  @IsString()
  @MinLength(2)
  Codigo: string;

  @IsString()
  @MinLength(2)
  Nombre: string;

  @IsNumber()
  Capacidad_max_aves: number;

  @IsNumber()
  Longitud: number;

}