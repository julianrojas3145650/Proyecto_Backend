import { IsUUID, IsString } from "class-validator";

export class CreateReportDto {

  @IsUUID()
  Id_usuario: string;

  @IsString()
  Tipo_reporte: string;

}