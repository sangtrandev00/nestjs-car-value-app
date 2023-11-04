import { Expose } from 'class-transformer';

// Expose ở đây có ý nghĩa gì ?
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
