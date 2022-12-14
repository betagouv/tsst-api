import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    encryptedEmail: string;

    @Column({ type: 'date', nullable: true })
    studiesExpirationDate: Date;
}
