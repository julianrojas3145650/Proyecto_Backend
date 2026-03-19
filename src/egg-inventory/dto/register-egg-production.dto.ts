import { IsUUID, IsNumber } from "class-validator";

export class RegisterEggProductionDto {

  @IsUUID()
  LoteId: string;

  @IsUUID()
  Tipo_huevo: string;

  @IsNumber()
  Cantidad: number;

}