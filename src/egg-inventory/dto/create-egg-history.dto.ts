import { IsUUID, IsNumber } from "class-validator";

export class CreateEggHistoryDto {

  @IsUUID()
  InventarioId: string;

  @IsUUID()
  ProduccionId: string;

  @IsUUID()
  UserioId: string;

  @IsNumber()
  Cantidad: number;

}