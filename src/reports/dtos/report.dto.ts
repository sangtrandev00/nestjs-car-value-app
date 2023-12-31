import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
// Expose ở đây có ý nghĩa gì ?
export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: string;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => {
    return obj?.user.id;
  })
  @Expose()
  userId: number;
}
