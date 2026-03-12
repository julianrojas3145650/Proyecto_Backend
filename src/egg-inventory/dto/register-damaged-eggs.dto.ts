import { IsUUID, IsNumber, IsString } from "class-validator";

export class RegisterDamagedEggsDto {

  @IsUUID()
  inventoryId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  reason: string;

}