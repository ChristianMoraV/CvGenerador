import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Curriculum } from '../../models/Info.interface';

@Component({
  selector: 'app-curriculum-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss']
})
export class CurriculumFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<Curriculum>();
  
  cvForm!: FormGroup;
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
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
      references: [''],
      profilePicture: [null],
    });

    // Añadir al menos un elemento para cada array
    this.addEducation();
    this.addWorkExperience();
    this.addSkill();
    this.addLanguage();
  }

  // Getters para acceder a los FormArrays con la aserción de tipo correcta
  get educationArray(): FormArray {
    return this.cvForm.get('education') as FormArray;
  }

  get workExperienceArray(): FormArray {
    return this.cvForm.get('workExperience') as FormArray;
  }

  get skillsArray(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  get languagesArray(): FormArray {
    return this.cvForm.get('languages') as FormArray;
  }

  get projectsArray(): FormArray {
    return this.cvForm.get('projects') as FormArray;
  }

  // Métodos para añadir y eliminar elementos del FormArray
  addEducation() {
    const educationForm = this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['']
    });
    this.educationArray.push(educationForm);
  }

  removeEducation(index: number) {
    if (this.educationArray.length > 1) {
      this.educationArray.removeAt(index);
    }
  }

  addWorkExperience() {
    const workForm = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['']
    });
    this.workExperienceArray.push(workForm);
  }

  removeWorkExperience(index: number) {
    if (this.workExperienceArray.length > 1) {
      this.workExperienceArray.removeAt(index);
    }
  }

  addSkill() {
    const skillForm = this.fb.group({
      name: ['', Validators.required],
      level: [3]
    });
    this.skillsArray.push(skillForm);
  }

  removeSkill(index: number) {
    if (this.skillsArray.length > 1) {
      this.skillsArray.removeAt(index);
    }
  }

  addLanguage() {
    const languageForm = this.fb.group({
      name: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
    this.languagesArray.push(languageForm);
  }

  removeLanguage(index: number) {
    if (this.languagesArray.length > 1) {
      this.languagesArray.removeAt(index);
    }
  }

  addProject() {
    const projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      url: ['']
    });
    this.projectsArray.push(projectForm);
  }

  removeProject(index: number) {
    this.projectsArray.removeAt(index);
  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    
    const file = fileInput.files[0];
    
    // Verificar tamaño - limitar a 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
      fileInput.value = '';
      return;
    }
    
    // Validación de tipo de archivo
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|bmp|webp)/)) {
      alert('Solo se permiten archivos de imagen (JPEG, PNG, GIF, BMP, WEBP)');
      fileInput.value = '';
      return;
    }
    
    this.selectedImage = file;
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
      // Precargar la imagen para asegurar que está disponible antes de usar
      const img = new Image();
      img.onload = () => {
        // La imagen se ha cargado correctamente
        // Redimensionar si es demasiado grande
        if (img.width > 800 || img.height > 800) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calcular nuevas dimensiones manteniendo la proporción
          let newWidth = img.width;
          let newHeight = img.height;
          
          if (img.width > img.height && img.width > 800) {
            newWidth = 800;
            newHeight = (img.height * 800) / img.width;
          } else if (img.height > 800) {
            newHeight = 800;
            newWidth = (img.width * 800) / img.height;
          }
          
          canvas.width = newWidth;
          canvas.height = newHeight;
          
          ctx?.drawImage(img, 0, 0, newWidth, newHeight);
          
          // Usar la imagen redimensionada
          const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
          this.imagePreview = resizedImage;
          this.cvForm.get('personalInfo.profilePicture')?.setValue(resizedImage);
        } else {
          // Usar la imagen original si no es demasiado grande
          this.cvForm.get('personalInfo.profilePicture')?.setValue(reader.result);
        }
      };
      
      img.onerror = () => {
        alert('No se pudo cargar la imagen. Por favor, intenta con otra.');
        this.imagePreview = null;
        fileInput.value = '';
      };
      
      img.src = reader.result as string;
    };
    
    reader.onerror = () => {
      alert('No se pudo leer el archivo. Por favor, intenta de nuevo.');
      fileInput.value = '';
    };
    
    reader.readAsDataURL(file);
}

  onSubmit() {
    if (this.cvForm.valid) {
      const formData = this.cvForm.value as Curriculum;
      this.formSubmit.emit(formData);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched(this.cvForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          const arrayControl = control.at(i);
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl as FormGroup);
          } else {
            (arrayControl as FormControl).markAsTouched();
          }
        }
      } else if (control) {
        control.markAsTouched();
      }
    });
  }
}
