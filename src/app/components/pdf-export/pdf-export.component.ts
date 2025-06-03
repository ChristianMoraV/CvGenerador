import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Curriculum } from '../../models/Info.interface';
import jsPDF from 'jspdf';
// Reemplazamos html2canvas con dom-to-image
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-pdf-export',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-export.component.html',
  styleUrls: ['./pdf-export.component.scss']
})
export class PdfExportComponent {
  @Input() curriculum!: Curriculum;
  isExporting = false;

  // Método simple que utiliza la función de impresión del navegador
  printCV() {
    window.print();
  }

  // Método para exportar a PDF usando jsPDF y dom-to-image
  exportToPdf() {
    this.isExporting = true;
    
    // Selecciona el elemento que contiene el CV
    const cvElement = document.querySelector('.cv-container') as HTMLElement;
    
    if (!cvElement) {
      console.error('CV container not found');
      this.isExporting = false;
      return;
    }

    // Mensaje para el usuario
    const notification = document.createElement('div');
    notification.textContent = 'Generando PDF, por favor espere...';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    document.body.appendChild(notification);

    // Función para limpiar
    const cleanup = () => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
      this.isExporting = false;
    };

    // Configuración para una mejor calidad
    const options = {
      quality: 0.95,
      bgcolor: '#ffffff',
      style: {
        'transform': 'scale(1)',
        'transform-origin': 'top left'
      }
    };

    // Generar imagen del CV usando dom-to-image
    domtoimage.toPng(cvElement, options)
      .then(dataUrl => {
        try {
          // Tamaño A4: 210mm x 297mm
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const pageHeight = 297;
          
          // Crear una imagen desde la URL de datos
          const img = new Image();
          img.src = dataUrl;
          
          // Una vez que la imagen esté cargada, agregarla al PDF
          img.onload = () => {
            // Calcular la altura proporcional
            const imgHeight = img.height * imgWidth / img.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Agregar la primera página
            pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Si el CV ocupa más de una página, añadir más páginas
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            
            // Genera un nombre de archivo basado en el nombre del usuario
            const fileName = `CV_${this.curriculum.personalInfo.name.replace(/\s+/g, '_')}.pdf`;
            
            // Guarda el PDF
            pdf.save(fileName);
            
            cleanup();
          };
          
          // Manejo de error si la imagen no se carga
          img.onerror = () => {
            console.error('Error loading image');
            cleanup();
            this.showErrorMessage();
          };
        } catch (error) {
          console.error('Error processing image data', error);
          cleanup();
          this.showErrorMessage();
        }
      })
      .catch(error => {
        console.error('Error generating image', error);
        cleanup();
        this.showErrorMessage();
      });
  }
  
  // Mostrar mensaje de error
  private showErrorMessage() {
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'Error al generar el PDF. Inténtalo de nuevo.';
    errorMsg.style.position = 'fixed';
    errorMsg.style.top = '20px';
    errorMsg.style.left = '50%';
    errorMsg.style.transform = 'translateX(-50%)';
    errorMsg.style.padding = '10px 20px';
    errorMsg.style.backgroundColor = 'rgba(220,53,69,0.9)';
    errorMsg.style.color = 'white';
    errorMsg.style.borderRadius = '5px';
    errorMsg.style.zIndex = '9999';
    document.body.appendChild(errorMsg);
    
    setTimeout(() => {
      document.body.removeChild(errorMsg);
    }, 3000);
  }
}
