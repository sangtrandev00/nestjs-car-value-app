import {
  IsNumber,
  IsString,
  IsLongitude,
  IsLatitude,
  Min,
  Max,
} from 'class-validator';

export class CreateReportDto {
  @Min(0)
  @IsNumber()
  @Max(1000000)
  price: number;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
