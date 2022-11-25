import { MigrationInterface, QueryRunner } from "typeorm";

export class addStudiesExpirationDateColumn1669372752025 implements MigrationInterface {
    name = 'addStudiesExpirationDateColumn1669372752025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "studiesExpirationDate" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "studiesExpirationDate"`);
    }

}
