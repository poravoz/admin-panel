import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class PhoneEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    date_added: Date;
}