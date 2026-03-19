import { IsUUID, IsNumber, IsString } from "class-validator";

export class RegisterDamagedEggsDto {

  @IsUUID()
  InventarioId: string;

  @IsNumber()
  Cantidad: number;

  @IsString()
  Razon: string;

}