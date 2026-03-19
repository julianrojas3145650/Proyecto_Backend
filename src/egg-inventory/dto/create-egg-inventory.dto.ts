import { IsUUID, IsNumber } from "class-validator";

export class CreateEggProductionDto {

  @IsUUID()
  LoteId: string;

  @IsUUID()
  Tipo_huevoId: string;

  @IsNumber()
  Cantidad: number;

}