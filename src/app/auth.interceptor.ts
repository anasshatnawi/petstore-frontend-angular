import { HttpInterceptorFn } from '@angular/common/http';
import { DEFAULT_AUTH_TOKEN, SERVER_URL } from '../lib/constans';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${DEFAULT_AUTH_TOKEN}`),
  });

  return next(authReq);
};
