import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurriculumFormComponent } from './components/curriculum-form/curriculum-form.component';
import { CurriculumPreviewComponent } from './components/curriculum-preview/curriculum-preview.component';
import { PdfExportComponent } from './components/pdf-export/pdf-export.component';
import { Curriculum } from './models/Info.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CurriculumFormComponent,
    CurriculumPreviewComponent,
    PdfExportComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CV Generator';
  curriculum: Curriculum | null = null;
  showPreview = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  handleFormSubmit(data: Curriculum) {
    this.curriculum = data;
    this.showPreview = true;
  }

  backToEdit() {
    this.showPreview = false;
  }
}
