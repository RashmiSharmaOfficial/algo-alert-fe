import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.scss'
})
export class WarningDialogComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = inject(MatDialogRef<WarningDialogComponent>);
  }
}
