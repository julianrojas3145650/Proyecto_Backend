import { IsUUID, IsNumber, IsString } from "class-validator";

export class FinishFlockDto {

  @IsUUID()
  LoteId: string;

  @IsNumber()
  Cantidad: number;

  @IsString()
  Razon: string;

}