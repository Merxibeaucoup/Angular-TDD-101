import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingBar = inject(LoadingBarService);
  const loader = loadingBar.useRef();
  loader.start();

  return next(req).pipe(finalize(() => loader.complete()));
};
