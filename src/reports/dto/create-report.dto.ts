import { IsUUID, IsString } from "class-validator";

export class CreateReportDto {

  @IsUUID()
  userId: string;

  @IsString()
  reportType: string;

}