import { IsString, IsNumber, IsUUID } from "class-validator";

export class CreateFlockDto {

  @IsString()
  name: string;

  @IsNumber()
  totalBirds: number;

  @IsUUID()
  breedId: string;

  @IsString()
  observation: string;

  @IsString()
  foodRation: string;

}