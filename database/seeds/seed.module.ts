import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import AppDataSource from '../../src/config/data-source';
import { User } from '../../src/users/entities/user.entity';
import { Role } from '../../src/roles/entities/role.entity';
import { UserRole } from '../../src/roles/entities/user-role.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options), // ← usa el data-source que ya tiene todo
    TypeOrmModule.forFeature([User, Role, UserRole]),
  ],
  providers: [SeedService],
})
export class SeedModule {}