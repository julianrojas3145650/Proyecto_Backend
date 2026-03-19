import { MigrationInterface, QueryRunner } from "typeorm";

export class Migraciones1773888982895 implements MigrationInterface {
    name = 'Migraciones1773888982895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reportes" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Id_usuario" character varying NOT NULL, "Tipo_reporte" character varying NOT NULL, CONSTRAINT "PK_7a1ba40c8ce08762f4a5f0523d4" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Raza" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Nombre" character varying(255) NOT NULL, "Descripcion" character varying(255) NOT NULL, CONSTRAINT "PK_ff534cb8725103feb37e07a9cf2" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Historial_asignacion_lote" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Cantidad_asignada" integer NOT NULL, "loteId" uuid, "galponId" uuid, CONSTRAINT "PK_b3fe57efc2e6b37a097cb621be5" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Galpon" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Codigo" character varying NOT NULL, "Nombre" character varying NOT NULL, "Capacidad_max_aves" integer NOT NULL, "Longitud" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7052ac467d974c0c8a20705296a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Ubicacion_lote" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Fecha" TIMESTAMP NOT NULL DEFAULT now(), "loteId" uuid, "galponId" uuid, CONSTRAINT "PK_0d79f62666011fae918d516f323" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Estado_lote" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Estado" character varying NOT NULL, "loteId" uuid, CONSTRAINT "PK_29c0545647687f75683d623a6ac" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "huevos_dañados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Cantidad" integer NOT NULL, "Razon" character varying NOT NULL, "registeredAt" TIMESTAMP NOT NULL DEFAULT now(), "inventarioId" uuid, CONSTRAINT "PK_7109b2f3c08b8376337b060b2fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Historial_Huevo" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "UsuarioId" character varying NOT NULL, "Cantidad" integer NOT NULL, "Fecha" TIMESTAMP NOT NULL DEFAULT now(), "inventarioId" uuid, "produccionId" uuid, CONSTRAINT "PK_a11dbf0cdca81e0195e1fc8bc37" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Inventario_huevo" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Tipo_huevoId" character varying NOT NULL, "Cantidad" integer NOT NULL, "loteId" uuid, "produccionId" uuid, CONSTRAINT "PK_a8e295fcd66719a78f59847d9e7" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Produccion_huevo" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Tipo_huevoId" character varying NOT NULL, "Cantidady" integer NOT NULL, "ProduccionFecha" TIMESTAMP NOT NULL DEFAULT now(), "loteId" uuid, CONSTRAINT "PK_a6540e0124e3f0681d6c09094de" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "lotes" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Nombre" character varying NOT NULL, "Total_aves" integer NOT NULL, "Observacion" character varying NOT NULL, "Racion_alimento" character varying NOT NULL, "Estado" character varying NOT NULL, "razaId" uuid, CONSTRAINT "PK_93c95498e8740614f6a997df509" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Finalizacion_lote" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Cantidad" integer NOT NULL, "Razon" character varying NOT NULL, "Fecha" TIMESTAMP NOT NULL DEFAULT now(), "loteId" uuid, CONSTRAINT "PK_c37a7985fdf9d54ed1c9ba36e27" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Aves_fallecidas" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Cantidad" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "loteId" uuid, CONSTRAINT "PK_5d0408803443c1f0abed9186ab6" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Tipo_huevo" ("id_tipo" SERIAL NOT NULL, "tipo" character varying(255) NOT NULL, "peso_min" numeric(10,2) NOT NULL, "peso_max" numeric(10,2) NOT NULL, CONSTRAINT "PK_28fcb259c63291b07ee9e7fa2bd" PRIMARY KEY ("id_tipo"))`);
        await queryRunner.query(`ALTER TABLE "Historial_asignacion_lote" ADD CONSTRAINT "FK_5bc1c753e69a9cef25f6f3367d9" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Historial_asignacion_lote" ADD CONSTRAINT "FK_afafeb38a35834db2fe3bae5538" FOREIGN KEY ("galponId") REFERENCES "Galpon"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Ubicacion_lote" ADD CONSTRAINT "FK_9741b86e268a653720aac17e2f6" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Ubicacion_lote" ADD CONSTRAINT "FK_0d087b72d551f715163d6612942" FOREIGN KEY ("galponId") REFERENCES "Galpon"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Estado_lote" ADD CONSTRAINT "FK_d505535c4d45eab1041b8508727" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "huevos_dañados" ADD CONSTRAINT "FK_a5d44d3c2d33dafec0b85e9b56a" FOREIGN KEY ("inventarioId") REFERENCES "Inventario_huevo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Historial_Huevo" ADD CONSTRAINT "FK_0bab1b8a97d52fac0b18ab964c2" FOREIGN KEY ("inventarioId") REFERENCES "Inventario_huevo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Historial_Huevo" ADD CONSTRAINT "FK_3ebc98e54fdb0857a7132d27f9e" FOREIGN KEY ("produccionId") REFERENCES "Produccion_huevo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inventario_huevo" ADD CONSTRAINT "FK_2013b589dae2e11e3eb34a449f9" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inventario_huevo" ADD CONSTRAINT "FK_1b38b95dcdc8bdb2fdebd62ec47" FOREIGN KEY ("produccionId") REFERENCES "Produccion_huevo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Produccion_huevo" ADD CONSTRAINT "FK_55b9e28c2466922970c4aca0c74" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lotes" ADD CONSTRAINT "FK_36424c8f3449b13f535c7233160" FOREIGN KEY ("razaId") REFERENCES "Raza"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Finalizacion_lote" ADD CONSTRAINT "FK_c7e8601604bfa9bda6927306f5e" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Aves_fallecidas" ADD CONSTRAINT "FK_7eb9c6672c00b3911282920a578" FOREIGN KEY ("loteId") REFERENCES "lotes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Aves_fallecidas" DROP CONSTRAINT "FK_7eb9c6672c00b3911282920a578"`);
        await queryRunner.query(`ALTER TABLE "Finalizacion_lote" DROP CONSTRAINT "FK_c7e8601604bfa9bda6927306f5e"`);
        await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT "FK_36424c8f3449b13f535c7233160"`);
        await queryRunner.query(`ALTER TABLE "Produccion_huevo" DROP CONSTRAINT "FK_55b9e28c2466922970c4aca0c74"`);
        await queryRunner.query(`ALTER TABLE "Inventario_huevo" DROP CONSTRAINT "FK_1b38b95dcdc8bdb2fdebd62ec47"`);
        await queryRunner.query(`ALTER TABLE "Inventario_huevo" DROP CONSTRAINT "FK_2013b589dae2e11e3eb34a449f9"`);
        await queryRunner.query(`ALTER TABLE "Historial_Huevo" DROP CONSTRAINT "FK_3ebc98e54fdb0857a7132d27f9e"`);
        await queryRunner.query(`ALTER TABLE "Historial_Huevo" DROP CONSTRAINT "FK_0bab1b8a97d52fac0b18ab964c2"`);
        await queryRunner.query(`ALTER TABLE "huevos_dañados" DROP CONSTRAINT "FK_a5d44d3c2d33dafec0b85e9b56a"`);
        await queryRunner.query(`ALTER TABLE "Estado_lote" DROP CONSTRAINT "FK_d505535c4d45eab1041b8508727"`);
        await queryRunner.query(`ALTER TABLE "Ubicacion_lote" DROP CONSTRAINT "FK_0d087b72d551f715163d6612942"`);
        await queryRunner.query(`ALTER TABLE "Ubicacion_lote" DROP CONSTRAINT "FK_9741b86e268a653720aac17e2f6"`);
        await queryRunner.query(`ALTER TABLE "Historial_asignacion_lote" DROP CONSTRAINT "FK_afafeb38a35834db2fe3bae5538"`);
        await queryRunner.query(`ALTER TABLE "Historial_asignacion_lote" DROP CONSTRAINT "FK_5bc1c753e69a9cef25f6f3367d9"`);
        await queryRunner.query(`DROP TABLE "Tipo_huevo"`);
        await queryRunner.query(`DROP TABLE "Aves_fallecidas"`);
        await queryRunner.query(`DROP TABLE "Finalizacion_lote"`);
        await queryRunner.query(`DROP TABLE "lotes"`);
        await queryRunner.query(`DROP TABLE "Produccion_huevo"`);
        await queryRunner.query(`DROP TABLE "Inventario_huevo"`);
        await queryRunner.query(`DROP TABLE "Historial_Huevo"`);
        await queryRunner.query(`DROP TABLE "huevos_dañados"`);
        await queryRunner.query(`DROP TABLE "Estado_lote"`);
        await queryRunner.query(`DROP TABLE "Ubicacion_lote"`);
        await queryRunner.query(`DROP TABLE "Galpon"`);
        await queryRunner.query(`DROP TABLE "Historial_asignacion_lote"`);
        await queryRunner.query(`DROP TABLE "Raza"`);
        await queryRunner.query(`DROP TABLE "reportes"`);
    }

}
