import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSupplyActionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre_accion: string;
}