import { Report } from 'src/reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // Có cần các thao tác khác không hay chỉ cần làm như vậy thôi!
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  // Hook Decorator
  // @AfterInsert()
  // logInsert() {
  //   console.log('inserted user with id', this.id);
  // }
}
