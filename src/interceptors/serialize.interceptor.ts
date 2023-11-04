import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

interface ClassContructor {
  new (...args: any[]): object;
}

// Decorator
export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Handle logic request right here

    // Run something before a request is handled by the request handler

    // Context ở đây ý nghĩa là gì ? Có phải là chứa những http request header

    console.log("I'm running before the handler: ", context);

    return next.handle().pipe(
      map((data: any) => {
        console.log('data: ', data);
        // Mục đích của việc convert plain to class là gì ?
        // Run something before the response is sent out
        console.log("I'm running before the response is sent out: ", data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
