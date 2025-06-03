import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumPreviewComponent } from './curriculum-preview.component';

describe('CurriculumPreviewComponent', () => {
  let component: CurriculumPreviewComponent;
  let fixture: ComponentFixture<CurriculumPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
