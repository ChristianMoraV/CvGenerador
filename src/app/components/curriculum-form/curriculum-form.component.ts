import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Curriculum } from '../../models/Info.interface';

@Component({
  selector: 'app-curriculum-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss']
})
export class CurriculumFormComponent {
  @Output() formSubmit = new EventEmitter<Curriculum>();
  
  cvForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cvForm = this.fb.group({
      personalInfo: this.fb.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: [''],
        profilePicture: [''],
        summary: ['']
      }),
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
      skills: this.fb.array([]),
      languages: this.fb.array([]),
      projects: this.fb.array([]),
      references: ['']
    });
  }

  // Education form controls
  get educationArray() {
    return this.cvForm.get('education') as FormArray;
  }

  addEducation() {
    const educationGroup = this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['']
    });
    this.educationArray.push(educationGroup);
  }

  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }

  // Work experience form controls
  get workExperienceArray() {
    return this.cvForm.get('workExperience') as FormArray;
  }

  addWorkExperience() {
    const workExperienceGroup = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      location: [''],
      description: [''],
      responsibilities: this.fb.array([this.fb.control('')])
    });
    this.workExperienceArray.push(workExperienceGroup);
  }

  removeWorkExperience(index: number) {
    this.workExperienceArray.removeAt(index);
  }

  // Skills form controls
  get skillsArray() {
    return this.cvForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillGroup = this.fb.group({
      name: ['', Validators.required],
      level: [3]
    });
    this.skillsArray.push(skillGroup);
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  // Languages form controls
  get languagesArray() {
    return this.cvForm.get('languages') as FormArray;
  }

  addLanguage() {
    const languageGroup = this.fb.group({
      name: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
    this.languagesArray.push(languageGroup);
  }

  removeLanguage(index: number) {
    this.languagesArray.removeAt(index);
  }

  // Projects form controls
  get projectsArray() {
    return this.cvForm.get('projects') as FormArray;
  }

  addProject() {
    const projectGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      url: [''],
      technologies: [[]],
      startDate: [''],
      endDate: ['']
    });
    this.projectsArray.push(projectGroup);
  }

  removeProject(index: number) {
    this.projectsArray.removeAt(index);
  }

  // Form submission
  onSubmit() {
    if (this.cvForm.valid) {
      this.formSubmit.emit(this.cvForm.value as Curriculum);
    } else {
      // Mark all fields as touched to trigger validation visuals
      this.markFormGroupTouched(this.cvForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(ctrl => {
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl);
          } else {
            ctrl.markAsTouched();
          }
        });
      }
    });
  }
}
