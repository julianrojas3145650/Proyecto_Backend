import { IsUUID, IsNumber } from "class-validator";

export class RegisterDeadBirdsDto {

  @IsUUID()
  LoteId: string;

  @IsNumber()
  Cantidad: number;

}