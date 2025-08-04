import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CvTemplate, TemplateOption } from '../models/cv-template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private selectedTemplateSubject = new BehaviorSubject<CvTemplate>(CvTemplate.PROFESSIONAL);
  public selectedTemplate$ = this.selectedTemplateSubject.asObservable();

  private templates: TemplateOption[] = [
    {
      id: CvTemplate.PROFESSIONAL,
      name: 'Professional',
      description: 'Clean and professional design with blue/gray theme'
    },
    {
      id: CvTemplate.MODERN,
      name: 'Modern',
      description: 'Contemporary design with clean lines and minimal colors'
    },
    {
      id: CvTemplate.CLASSIC,
      name: 'Classic',
      description: 'Traditional black and white layout for formal applications'
    }
  ];

  constructor() { }

  getTemplates(): TemplateOption[] {
    return this.templates;
  }

  getCurrentTemplate(): CvTemplate {
    return this.selectedTemplateSubject.value;
  }

  setTemplate(template: CvTemplate): void {
    this.selectedTemplateSubject.next(template);
  }

  getTemplateById(id: CvTemplate): TemplateOption | undefined {
    return this.templates.find(template => template.id === id);
  }
}
