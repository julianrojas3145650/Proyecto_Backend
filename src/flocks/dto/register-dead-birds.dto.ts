import { IsUUID, IsNumber } from "class-validator";

export class RegisterDeadBirdsDto {

  @IsUUID()
  flockId: string;

  @IsNumber()
  quantity: number;

}