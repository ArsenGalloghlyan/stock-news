import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorComponent } from '../../components/dialogs/http-error/http-error.component';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError(() => {
      if (dialog.openDialogs.length === 0) {
        dialog.open(HttpErrorComponent);
      }
      return EMPTY;
    })
  );
};
