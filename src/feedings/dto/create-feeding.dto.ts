import { IsUUID, IsNumber } from "class-validator";

export class CreateFeedingDto {

  @IsUUID()
  userId: string;

  @IsUUID()
  flockId: string;

  @IsUUID()
  supplyId: string;

  @IsNumber()
  quantity: number;

}