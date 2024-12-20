import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpInterceptorFn,
} from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
