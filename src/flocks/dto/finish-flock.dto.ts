import { IsUUID, IsNumber, IsString } from "class-validator";

export class FinishFlockDto {

  @IsUUID()
  flockId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  reason: string;

}