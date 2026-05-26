import { IsUUID, IsNumber } from 'class-validator';

export class RegisterEggProductionDto {
  @IsUUID()
  loteId!: string;

  @IsUUID()
  tipoHuevoId!: string;

  @IsNumber()
  cantidad!: number;
}
