export enum CvTemplate {
  PROFESSIONAL = 'professional',
  MODERN = 'modern',
  CLASSIC = 'classic'
}

export interface TemplateOption {
  id: CvTemplate;
  name: string;
  description: string;
  preview?: string;
}
