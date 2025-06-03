import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Curriculum } from '../../models/Info.interface';

@Component({
  selector: 'app-curriculum-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-preview.component.html',
  styleUrls: ['./curriculum-preview.component.scss']
})
export class CurriculumPreviewComponent {
  @Input() curriculum!: Curriculum;
  
  // You can implement additional methods here for display logic
  getYearFromDate(dateString: string | undefined): string {
    if (!dateString) return 'Present';
    return new Date(dateString).getFullYear().toString();
  }
  
  formatDateRange(start: string, end?: string): string {
    const startYear = this.getYearFromDate(start);
    const endYear = end ? this.getYearFromDate(end) : 'Present';
    return `${startYear} - ${endYear}`;
  }
}
