import { MigrationInterface, QueryRunner } from "typeorm";

export class addUniquePropertyToUser1669301504971 implements MigrationInterface {
    name = 'addUniquePropertyToUser1669301504971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_1f88fe9c00ac6ab6606ffeee0b3" UNIQUE ("encryptedEmail")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_1f88fe9c00ac6ab6606ffeee0b3"`);
    }

}
