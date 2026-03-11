import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { SuppliesModule } from './supplies/supplies.module';
import { SupplyCategoriesModule } from './supply-categories/supply-categories.module';
import { MeasurementUnitsModule } from './measurement-units/measurement-units.module';
import { BreedsModule } from './breeds/breeds.module';
import { BarnsModule } from './barns/barns.module';
import { FlocksModule } from './flocks/flocks.module';
import { EggTypesModule } from './egg-types/egg-types.module';
import { EggInventoryModule } from './egg-inventory/egg-inventory.module';
import { FeedingsModule } from './feedings/feedings.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    RolesModule,
    PermissionsModule,
    SuppliesModule,
    SupplyCategoriesModule,
    MeasurementUnitsModule,
    BreedsModule,
    BarnsModule,
    FlocksModule,
    EggTypesModule,
    EggInventoryModule,
    FeedingsModule,
    ReportsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
