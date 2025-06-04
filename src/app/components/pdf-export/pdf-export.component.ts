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

  // Pre-cargar todas las imágenes antes de generar el PDF
  const images = cvElement.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;
  
  if (totalImages === 0) {
    // Si no hay imágenes, proceder directamente
    this.generatePdfFromElement(cvElement, cleanup);
    return;
  }
  
  // Si hay imágenes, asegurarse de que todas estén cargadas
  images.forEach(img => {
    if (img.complete) {
      loadedImages++;
      if (loadedImages === totalImages) {
        // Todas las imágenes ya están cargadas
        this.generatePdfFromElement(cvElement, cleanup);
      }
    } else {
      // Para imágenes que aún se están cargando
      const originalSrc = img.src;
      
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          // Todas las imágenes están cargadas
          this.generatePdfFromElement(cvElement, cleanup);
        }
      };
      
      img.onerror = () => {
        console.error('Error loading image:', originalSrc);
        // Intentar nuevamente con una imagen de placeholder
        img.src = 'assets/img/placeholder.png'; // Asegúrate de tener esta imagen
        loadedImages++;
        if (loadedImages === totalImages) {
          // Proceder aunque algunas imágenes hayan fallado
          this.generatePdfFromElement(cvElement, cleanup);
        }
      };
      
      // En algunos casos, recargar la imagen puede ayudar
      if (img.src.startsWith('data:')) {
        // Para imágenes base64, no necesitamos recargar
        // pero asegurémonos de que el evento onload se dispare
        setTimeout(() => {
          if (!img.complete) {
            loadedImages++;
            if (loadedImages === totalImages) {
              this.generatePdfFromElement(cvElement, cleanup);
            }
          }
        }, 1000);
      } else {
        // Para URLs, intentar recargar
        const currentSrc = img.src;
        img.src = '';
        setTimeout(() => {
          img.src = currentSrc;
        }, 10);
      }
    }
  });

  // Si después de 5 segundos no se han cargado todas las imágenes, continuar de todos modos
  setTimeout(() => {
    if (loadedImages < totalImages) {
      console.warn(`Algunas imágenes no se cargaron (${loadedImages}/${totalImages}). Generando PDF de todos modos.`);
      this.generatePdfFromElement(cvElement, cleanup);
    }
  }, 5000);
  }
  
  // Mostrar mensaje de error
 private showErrorMessage(message: string) {
  const errorMsg = document.createElement('div');
  errorMsg.textContent = message;
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

  private generatePdfFromElement(element: HTMLElement, cleanup: () => void) {
  // Configuración para una mejor calidad
  const options = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false
  };

  // Usar html2canvas en lugar de domtoimage para mejor compatibilidad
  import('html2canvas').then(html2canvas => {
    html2canvas.default(element, options).then(canvas => {
      import('jspdf').then(jsPDF => {
        try {
          const pdf = new jsPDF.default('p', 'mm', 'a4');
          const imgData = canvas.toDataURL('image/png');
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pageWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          let heightLeft = imgHeight;
          let position = 0;
          
          // Primera página
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          
          // Agregar páginas adicionales si es necesario
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          
          const fileName = `CV_${this.curriculum.personalInfo.name.replace(/\s+/g, '_')}.pdf`;
          pdf.save(fileName);
          cleanup();
        } catch (error) {
          console.error('Error generating PDF', error);
          cleanup();
          this.showErrorMessage('Error al generar el PDF. Por favor inténtelo de nuevo.');
        }
      }).catch(error => {
        console.error('Error loading jsPDF', error);
        cleanup();
        this.showErrorMessage('No se pudo cargar la biblioteca de PDF. Por favor, verifique su conexión.');
      });
    }).catch(error => {
      console.error('Error with html2canvas', error);
      cleanup();
      this.showErrorMessage('Error al procesar el CV para PDF. Intente con una imagen de perfil más pequeña.');
    });
  }).catch(error => {
    console.error('Error loading html2canvas', error);
    cleanup();
    this.showErrorMessage('No se pudo cargar la biblioteca necesaria. Por favor, verifique su conexión.');
  });
}

}
