import { MigrationInterface, QueryRunner } from "typeorm";

export class Migraciones1773325357756 implements MigrationInterface {
    name = 'Migraciones1773325357756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "document" integer NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "lastAccess" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "breeds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_e89f6e1fbb29d28623b4feb2b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flock_assignment_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "assignedQuantity" integer NOT NULL, "flockId" uuid, "barnId" uuid, CONSTRAINT "PK_5057adf290167f5c01ea1a94184" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "maxBirdCapacity" integer NOT NULL, "length" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a2b49a5b147fead63339bcc8d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flock_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "flockId" uuid, "barnId" uuid, CONSTRAINT "PK_c1e5b1ee59636cc6d024b6cb620" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flock_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "flockId" uuid, CONSTRAINT "PK_835aa6295671d06d57d1bc3e0cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "damaged_eggs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "reason" character varying NOT NULL, "registeredAt" TIMESTAMP NOT NULL DEFAULT now(), "inventoryId" uuid, CONSTRAINT "PK_1beff1f6264b4a11a1ce5310be8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "egg_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "quantity" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "inventoryId" uuid, "productionId" uuid, CONSTRAINT "PK_27e7b6269845ef5f6c58750a44a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "egg_inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eggTypeId" character varying NOT NULL, "quantity" integer NOT NULL, "flockId" uuid, "productionId" uuid, CONSTRAINT "PK_be4c3984c7514d8a9fdb96d1627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "egg_production" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eggTypeId" character varying NOT NULL, "quantity" integer NOT NULL, "productionDate" TIMESTAMP NOT NULL DEFAULT now(), "flockId" uuid, CONSTRAINT "PK_9c9af1a65060043e37aaff9011a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "totalBirds" integer NOT NULL, "observation" character varying NOT NULL, "foodRation" character varying NOT NULL, "status" character varying NOT NULL, "breedId" uuid, CONSTRAINT "PK_efacaf2f3a4593fa8a914520f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "finished_flocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "reason" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "flockId" uuid, CONSTRAINT "PK_62d70e8ebdf728b71d3066e18c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dead_birds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "flockId" uuid, CONSTRAINT "PK_195d9a11dad67e62d25df60386f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "EggType" ("id_tipo" SERIAL NOT NULL, "tipo" character varying(255) NOT NULL, "peso_min" numeric(10,2) NOT NULL, "peso_max" numeric(10,2) NOT NULL, CONSTRAINT "PK_c733432ec648e7d92ebdc87e6fe" PRIMARY KEY ("id_tipo"))`);
        await queryRunner.query(`ALTER TABLE "flock_assignment_history" ADD CONSTRAINT "FK_4da6daddcd2ce563941be5f4cbf" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flock_assignment_history" ADD CONSTRAINT "FK_0f4c56cfc906e0307b6d7811236" FOREIGN KEY ("barnId") REFERENCES "barns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flock_locations" ADD CONSTRAINT "FK_05b03960bcefbf381b94fba4700" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flock_locations" ADD CONSTRAINT "FK_fb83da1ed70ef961140608cc21e" FOREIGN KEY ("barnId") REFERENCES "barns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flock_status" ADD CONSTRAINT "FK_f941da06d4e8a1a8ef7c1a54d7a" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "damaged_eggs" ADD CONSTRAINT "FK_83e5ab57cf0463b518b943eff42" FOREIGN KEY ("inventoryId") REFERENCES "egg_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_history" ADD CONSTRAINT "FK_d3f9b4f8d4860445b2ff252806d" FOREIGN KEY ("inventoryId") REFERENCES "egg_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_history" ADD CONSTRAINT "FK_56e65f8a8dbb9fbc96790d9819a" FOREIGN KEY ("productionId") REFERENCES "egg_production"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_inventory" ADD CONSTRAINT "FK_f3e5d2e5ea09888e27191fdae91" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_inventory" ADD CONSTRAINT "FK_c114c631c099cda2c7fb3c8ce4f" FOREIGN KEY ("productionId") REFERENCES "egg_production"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_production" ADD CONSTRAINT "FK_3c9027b1807431d6b977b4e9b58" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flocks" ADD CONSTRAINT "FK_69d051369f46b5e54d840ef0bff" FOREIGN KEY ("breedId") REFERENCES "breeds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "finished_flocks" ADD CONSTRAINT "FK_08ce5be25c4b3d119e6db98c53d" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dead_birds" ADD CONSTRAINT "FK_1c19389c95c600c2f5e0750af7b" FOREIGN KEY ("flockId") REFERENCES "flocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dead_birds" DROP CONSTRAINT "FK_1c19389c95c600c2f5e0750af7b"`);
        await queryRunner.query(`ALTER TABLE "finished_flocks" DROP CONSTRAINT "FK_08ce5be25c4b3d119e6db98c53d"`);
        await queryRunner.query(`ALTER TABLE "flocks" DROP CONSTRAINT "FK_69d051369f46b5e54d840ef0bff"`);
        await queryRunner.query(`ALTER TABLE "egg_production" DROP CONSTRAINT "FK_3c9027b1807431d6b977b4e9b58"`);
        await queryRunner.query(`ALTER TABLE "egg_inventory" DROP CONSTRAINT "FK_c114c631c099cda2c7fb3c8ce4f"`);
        await queryRunner.query(`ALTER TABLE "egg_inventory" DROP CONSTRAINT "FK_f3e5d2e5ea09888e27191fdae91"`);
        await queryRunner.query(`ALTER TABLE "egg_history" DROP CONSTRAINT "FK_56e65f8a8dbb9fbc96790d9819a"`);
        await queryRunner.query(`ALTER TABLE "egg_history" DROP CONSTRAINT "FK_d3f9b4f8d4860445b2ff252806d"`);
        await queryRunner.query(`ALTER TABLE "damaged_eggs" DROP CONSTRAINT "FK_83e5ab57cf0463b518b943eff42"`);
        await queryRunner.query(`ALTER TABLE "flock_status" DROP CONSTRAINT "FK_f941da06d4e8a1a8ef7c1a54d7a"`);
        await queryRunner.query(`ALTER TABLE "flock_locations" DROP CONSTRAINT "FK_fb83da1ed70ef961140608cc21e"`);
        await queryRunner.query(`ALTER TABLE "flock_locations" DROP CONSTRAINT "FK_05b03960bcefbf381b94fba4700"`);
        await queryRunner.query(`ALTER TABLE "flock_assignment_history" DROP CONSTRAINT "FK_0f4c56cfc906e0307b6d7811236"`);
        await queryRunner.query(`ALTER TABLE "flock_assignment_history" DROP CONSTRAINT "FK_4da6daddcd2ce563941be5f4cbf"`);
        await queryRunner.query(`DROP TABLE "EggType"`);
        await queryRunner.query(`DROP TABLE "dead_birds"`);
        await queryRunner.query(`DROP TABLE "finished_flocks"`);
        await queryRunner.query(`DROP TABLE "flocks"`);
        await queryRunner.query(`DROP TABLE "egg_production"`);
        await queryRunner.query(`DROP TABLE "egg_inventory"`);
        await queryRunner.query(`DROP TABLE "egg_history"`);
        await queryRunner.query(`DROP TABLE "damaged_eggs"`);
        await queryRunner.query(`DROP TABLE "flock_status"`);
        await queryRunner.query(`DROP TABLE "flock_locations"`);
        await queryRunner.query(`DROP TABLE "barns"`);
        await queryRunner.query(`DROP TABLE "flock_assignment_history"`);
        await queryRunner.query(`DROP TABLE "breeds"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
