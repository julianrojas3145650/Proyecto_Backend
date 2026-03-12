import { IsUUID, IsNumber } from "class-validator";

export class AssignFlockDto {

  @IsUUID()
  barnId: string;

  @IsUUID()
  flockId: string;

  @IsNumber()
  quantity: number;

}