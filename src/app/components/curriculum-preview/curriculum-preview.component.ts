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

  getFormattedDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  getDateRangeText(startDate: string, endDate: string | undefined): string {
    const formattedStartDate = this.getFormattedDate(startDate);
    if (!endDate) return `${formattedStartDate} - presente`;
    return `${formattedStartDate} - ${this.getFormattedDate(endDate)}`;
  }
}
