import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumPreviewComponent } from './curriculum-preview.component';
import { Curriculum } from '../../models/Info.interface';
import { TemplateService } from '../../services/template.service';

describe('CurriculumPreviewComponent', () => {
  let component: CurriculumPreviewComponent;
  let fixture: ComponentFixture<CurriculumPreviewComponent>;

  const mockCurriculum: Curriculum = {
    personalInfo: {
      name: 'Test User',
      title: 'Test Title',
      email: 'test@example.com',
      phone: '123-456-7890'
    },
    education: [],
    workExperience: [],
    skills: [],
    languages: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumPreviewComponent],
      providers: [TemplateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumPreviewComponent);
    component = fixture.componentInstance;
    component.curriculum = mockCurriculum;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
