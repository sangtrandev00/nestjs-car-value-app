import {
  IsNumber,
  IsString,
  IsLongitude,
  IsLatitude,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class UpdateReportDto {
  @Min(0)
  @IsNumber()
  @Max(1000000)
  @IsOptional()
  price: number;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @IsOptional()
  year: number;

  @IsLongitude()
  @IsOptional()
  lng: number;

  @IsLatitude()
  @IsOptional()
  lat: number;

  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsOptional()
  mileage: number;
}
