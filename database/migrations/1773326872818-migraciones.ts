import { MigrationInterface, QueryRunner } from "typeorm";

export class Migraciones1773326872818 implements MigrationInterface {
    name = 'Migraciones1773326872818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "reportType" character varying NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feeding" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "supplyId" character varying NOT NULL, "quantity" numeric NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "flockId" uuid, CONSTRAINT "PK_20f7a5dab73ceba57de9374199b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feeding" ADD CONSTRAINT "FK_3725d6a82152faf481029c3ae0a" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feeding" DROP CONSTRAINT "FK_3725d6a82152faf481029c3ae0a"`);
        await queryRunner.query(`DROP TABLE "feeding"`);
        await queryRunner.query(`DROP TABLE "reports"`);
    }

}
