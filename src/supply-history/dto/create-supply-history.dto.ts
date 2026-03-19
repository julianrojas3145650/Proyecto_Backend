import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateSupplyHistoryDto {
  @IsInt()
  @IsPositive()
  id_insumos: number;

  @IsInt()
  @IsPositive()
  id_historial_accion: number;

  @IsNumber()
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descripcion: string;

  @IsDateString()
  fecha: string;
}