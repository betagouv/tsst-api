import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ApiKey {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    hash: string;

    @Column({ type: 'date' })
    expirationDate: Date;
}
