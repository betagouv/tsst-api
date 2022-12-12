import { MigrationInterface, QueryRunner } from "typeorm";

export class addApiKey1670863512473 implements MigrationInterface {
    name = 'addApiKey1670863512473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "expirationDate" date NOT NULL, CONSTRAINT "UQ_45e0aa2a880b928326a05a28885" UNIQUE ("hash"), CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api_key"`);
    }

}
