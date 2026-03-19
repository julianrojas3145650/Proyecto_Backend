import { IsString, IsNumber, IsUUID } from "class-validator";

export class CreateFlockDto {

  @IsString()
  nombre: string;

  @IsNumber()
  Total_aves: number;

  @IsUUID()
  RazaId: string;

  @IsString()
  observacion: string;

  @IsString()
  Racion_alimento: string;

}