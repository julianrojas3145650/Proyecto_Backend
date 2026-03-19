import { IsUUID, IsNumber } from "class-validator";

export class AssignFlockDto {

  @IsUUID()
  GalponId: string;

  @IsUUID()
  LoteId: string;

  @IsNumber()
  Cantidad: number;

}