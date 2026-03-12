import { IsUUID, IsNumber } from "class-validator";

export class CreateEggHistoryDto {

  @IsUUID()
  inventoryId: string;

  @IsUUID()
  productionId: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  quantity: number;

}