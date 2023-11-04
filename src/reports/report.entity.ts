import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string; // EX: Toyota, Honda, Hynudai

  @Column()
  model: string; // EX: Camry, Civic, Sonata

  @Column()
  year: number; // EX: 2020, 2019, 2018

  @Column()
  lng: number; // EX: 10.123456

  @Column()
  lat: number; // EX: 106.123456

  @Column()
  mileage: number; // EX: 10000, 20000, 30000 ? (Sô dăm đã đi --> Chính xác), hay số dặm max có thể đi của xe
}
