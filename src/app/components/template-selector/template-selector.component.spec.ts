import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSelectorComponent } from './template-selector.component';
import { TemplateService } from '../../services/template.service';

describe('TemplateSelectorComponent', () => {
  let component: TemplateSelectorComponent;
  let fixture: ComponentFixture<TemplateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSelectorComponent],
      providers: [TemplateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
