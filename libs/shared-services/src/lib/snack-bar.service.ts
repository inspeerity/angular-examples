import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(
    message,
    options = { duration: 3000, panelClass: [] },
    action = null
  ) {
    this.snackbar.open(message, action, options);
  }

  showWarningSnackbar(message) {
    this.showSnackbar(message, {
      duration: 4000,
      panelClass: ['warning-snackbar']
    });
  }
}
