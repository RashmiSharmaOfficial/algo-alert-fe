import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface SnackbarConfig {
  message: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public defaultConfig: SnackbarConfig = {
    message: "Something went wrong!",
    horizontalPosition: 'left',
    verticalPosition: 'bottom'
  };

  constructor(private snackBar: MatSnackBar) { }

  public snackbarConfig = new BehaviorSubject<SnackbarConfig | null>(null);

  public setSnackBar(config: SnackbarConfig): void {
    this.snackbarConfig.next(config as any);
  }

  public showDefaultToast(message: string) {
    const messageConfig: SnackbarConfig = {
      message: message,
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    };

    // Directly use Angular Material's MatSnackBar to show the toast
    this.snackBar.open(messageConfig.message, 'Close', {
      duration: 3000, // 3 seconds
      horizontalPosition: messageConfig.horizontalPosition,
      verticalPosition: messageConfig.verticalPosition,
    });

    // If you want to still use BehaviorSubject for some purpose:
    this.setSnackBar(messageConfig);
  }
}
