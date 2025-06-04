@echo off
echo Reconstruyendo la carpeta docs para GitHub Pages...

:: Limpiar cache si es necesario
rmdir /s /q .angular\cache

:: Instalar dependencias (opcional, ya que parece estar al día)
call npm install

:: Construir la aplicación con --force para ignorar errores de presupuesto
call ng build --configuration production --force

:: Crear archivos para GitHub Pages
if exist docs (
  copy docs\index.html docs\404.html
  type nul > docs\.nojekyll
  echo ¡Reconstrucción completada! La carpeta docs está lista para GitHub Pages.
) else (
  echo Error: La carpeta docs no fue generada. Verifica los errores anteriores.
)