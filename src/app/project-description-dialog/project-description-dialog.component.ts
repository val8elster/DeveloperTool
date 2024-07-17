import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-description-dialog',
  templateUrl: './project-description-dialog.component.html',
})
export class ProjectDescriptionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }) {}
}
