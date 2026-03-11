import { PartialType } from '@nestjs/mapped-types';
import { CreateEggInventoryDto } from './create-egg-inventory.dto';

export class UpdateEggInventoryDto extends PartialType(CreateEggInventoryDto) {}
