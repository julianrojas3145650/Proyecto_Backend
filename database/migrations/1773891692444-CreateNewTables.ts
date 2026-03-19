import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTables1773891692444 implements MigrationInterface {
    name = 'CreateNewTables1773891692444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "llamar_usuario" ("id_llamar_usuario" SERIAL NOT NULL, "id_usuario" uuid NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_modificacion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5d1cb747df5bb70e5bfcc4236ec" PRIMARY KEY ("id_llamar_usuario"))`);
        await queryRunner.query(`CREATE TABLE "permiso" ("id_permiso" SERIAL NOT NULL, "codigo" integer NOT NULL, "descripcion" character varying(255) NOT NULL, CONSTRAINT "PK_80aab004cebf98f1688b787eb7c" PRIMARY KEY ("id_permiso"))`);
        await queryRunner.query(`CREATE TABLE "rol_permiso" ("id_rol_permiso" SERIAL NOT NULL, "id_permiso" integer NOT NULL, "id_rol" integer NOT NULL, CONSTRAINT "PK_151312cfdb886f6d9dc19f9ccfd" PRIMARY KEY ("id_rol_permiso"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("id_rol" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, CONSTRAINT "PK_0b42a30072d57ccfad9949218da" PRIMARY KEY ("id_rol"))`);
        await queryRunner.query(`CREATE TABLE "usuario_rol" ("id_usuario_rol" SERIAL NOT NULL, "id_rol" integer NOT NULL, "id_usuario" uuid NOT NULL, CONSTRAINT "PK_ca713aaaeccf9816b62b41ebdcb" PRIMARY KEY ("id_usuario_rol"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(255) NOT NULL, "apellido" character varying(255) NOT NULL, "documento" character varying(255) NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "ultimo_acceso" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`CREATE TABLE "categoria_insumo" ("id_categoria" SERIAL NOT NULL, "nombre_categoria" character varying(255) NOT NULL, CONSTRAINT "PK_647e3bb37ee60e0ef2361c5ee1a" PRIMARY KEY ("id_categoria"))`);
        await queryRunner.query(`CREATE TABLE "unidad_medida" ("id_unidad_medida" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "abreviatura" character varying(255) NOT NULL, CONSTRAINT "PK_dac609572f56f4807edf3dda2ad" PRIMARY KEY ("id_unidad_medida"))`);
        await queryRunner.query(`CREATE TABLE "insumo" ("id_insumos" SERIAL NOT NULL, "id_categoria" integer NOT NULL, "id_unidad_medida" integer NOT NULL, "id_llamar_usuario" integer NOT NULL, "nombre" character varying(255) NOT NULL, "cantidad" numeric(10,2) NOT NULL, "fecha" TIMESTAMP NOT NULL, CONSTRAINT "PK_d291f5ed968fb862f6d7f28cff7" PRIMARY KEY ("id_insumos"))`);
        await queryRunner.query(`CREATE TABLE "accion_historial_movimientos" ("id_historial_accion" SERIAL NOT NULL, "nombre_accion" character varying(255) NOT NULL, CONSTRAINT "PK_9be05aeaa5e5c196542c4913492" PRIMARY KEY ("id_historial_accion"))`);
        await queryRunner.query(`CREATE TABLE "historial_insumo" ("id_historial_insumo" SERIAL NOT NULL, "id_insumos" integer NOT NULL, "id_historial_accion" integer NOT NULL, "cantidad" double precision NOT NULL, "descripcion" character varying(255) NOT NULL, "fecha" TIMESTAMP NOT NULL, CONSTRAINT "PK_ff7aa2f097292c1f972208a7f96" PRIMARY KEY ("id_historial_insumo"))`);
        await queryRunner.query(`ALTER TABLE "llamar_usuario" ADD CONSTRAINT "FK_577eb160128ebafd1f8852d7eb4" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" ADD CONSTRAINT "FK_9c0fd212b970f71bf0a9465c4f3" FOREIGN KEY ("id_permiso") REFERENCES "permiso"("id_permiso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" ADD CONSTRAINT "FK_1d9e5be3d74310f98e398912d94" FOREIGN KEY ("id_rol") REFERENCES "rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_96d2a6ecb2ad0931416610845cf" FOREIGN KEY ("id_rol") REFERENCES "rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_6adca3617fc69b2864e67196f2a" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "insumo" ADD CONSTRAINT "FK_4fc30af7b401fb76a04d009a564" FOREIGN KEY ("id_categoria") REFERENCES "categoria_insumo"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "insumo" ADD CONSTRAINT "FK_983c9e0e5709a0ee91eac157a51" FOREIGN KEY ("id_unidad_medida") REFERENCES "unidad_medida"("id_unidad_medida") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historial_insumo" ADD CONSTRAINT "FK_91619531ac8d6a8c2b2ae7ae490" FOREIGN KEY ("id_insumos") REFERENCES "insumo"("id_insumos") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historial_insumo" ADD CONSTRAINT "FK_afd9ee94165c7d0181a595d247b" FOREIGN KEY ("id_historial_accion") REFERENCES "accion_historial_movimientos"("id_historial_accion") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historial_insumo" DROP CONSTRAINT "FK_afd9ee94165c7d0181a595d247b"`);
        await queryRunner.query(`ALTER TABLE "historial_insumo" DROP CONSTRAINT "FK_91619531ac8d6a8c2b2ae7ae490"`);
        await queryRunner.query(`ALTER TABLE "insumo" DROP CONSTRAINT "FK_983c9e0e5709a0ee91eac157a51"`);
        await queryRunner.query(`ALTER TABLE "insumo" DROP CONSTRAINT "FK_4fc30af7b401fb76a04d009a564"`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_6adca3617fc69b2864e67196f2a"`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_96d2a6ecb2ad0931416610845cf"`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" DROP CONSTRAINT "FK_1d9e5be3d74310f98e398912d94"`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" DROP CONSTRAINT "FK_9c0fd212b970f71bf0a9465c4f3"`);
        await queryRunner.query(`ALTER TABLE "llamar_usuario" DROP CONSTRAINT "FK_577eb160128ebafd1f8852d7eb4"`);
        await queryRunner.query(`DROP TABLE "historial_insumo"`);
        await queryRunner.query(`DROP TABLE "accion_historial_movimientos"`);
        await queryRunner.query(`DROP TABLE "insumo"`);
        await queryRunner.query(`DROP TABLE "unidad_medida"`);
        await queryRunner.query(`DROP TABLE "categoria_insumo"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario_rol"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "rol_permiso"`);
        await queryRunner.query(`DROP TABLE "permiso"`);
        await queryRunner.query(`DROP TABLE "llamar_usuario"`);
    }

}
