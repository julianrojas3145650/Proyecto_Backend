import { IsUUID, IsNumber } from "class-validator";

export class RegisterEggProductionDto {

  @IsUUID()
  flockId: string;

  @IsUUID()
  eggTypeId: string;

  @IsNumber()
  quantity: number;

}