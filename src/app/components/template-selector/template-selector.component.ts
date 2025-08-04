import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TemplateService } from '../../services/template.service';
import { CvTemplate, TemplateOption } from '../../models/cv-template';

@Component({
  selector: 'app-template-selector',
  imports: [CommonModule],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.scss'
})
export class TemplateSelectorComponent implements OnInit, OnDestroy {
  templates: TemplateOption[] = [];
  selectedTemplate: CvTemplate = CvTemplate.PROFESSIONAL;
  private subscription: Subscription = new Subscription();

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templates = this.templateService.getTemplates();
    this.subscription.add(
      this.templateService.selectedTemplate$.subscribe(template => {
        this.selectedTemplate = template;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectTemplate(templateId: CvTemplate): void {
    this.templateService.setTemplate(templateId);
  }
}
