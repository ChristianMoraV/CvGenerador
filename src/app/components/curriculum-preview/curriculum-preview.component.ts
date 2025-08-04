import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Curriculum } from '../../models/Info.interface';
import { CvTemplate } from '../../models/cv-template';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-curriculum-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-preview.component.html',
  styleUrls: ['./curriculum-preview.component.scss']
})
export class CurriculumPreviewComponent implements OnInit, OnDestroy {
  @Input() curriculum!: Curriculum;
  currentTemplate: CvTemplate = CvTemplate.PROFESSIONAL;
  private subscription: Subscription = new Subscription();

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.templateService.selectedTemplate$.subscribe(template => {
        this.currentTemplate = template;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  get templateClass(): string {
    return `template-${this.currentTemplate}`;
  }
}
