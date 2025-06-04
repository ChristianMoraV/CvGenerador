@echo off
echo Reconstruyendo la carpeta docs para GitHub Pages...

:: Limpiar cache si es necesario
rmdir /s /q .angular\cache

:: Construir la aplicación con la base href correcta
call ng build --configuration production --base-href "/CvGenerador/"

:: Verificar posibles ubicaciones de salida en Angular 19+
if exist dist\cv-app\browser (
  set "BUILD_PATH=dist\cv-app\browser"
) else if exist dist\browser (
  set "BUILD_PATH=dist\browser"
) else (
  echo Buscando carpeta de compilación...
  for /d %%d in (dist\*) do (
    if exist "%%d\browser" (
      set "BUILD_PATH=%%d\browser"
    )
  )
)

:: Verificar si se encontró la ruta de compilación
if defined BUILD_PATH (
  echo Encontrada la compilación en: %BUILD_PATH%
  
  :: Crear o limpiar la carpeta docs
  if exist docs rmdir /s /q docs
  mkdir docs
  
  :: Copiar archivos de la compilación a docs
  xcopy "%BUILD_PATH%\*" docs\ /s /y /i
  
  :: Verificar si el index.html contiene la base href correcta
  findstr "/CvGenerador/" docs\index.html > nul
  if errorlevel 1 (
    echo ADVERTENCIA: No se encontró la base href correcta en index.html
    echo Actualizando manualmente...
    powershell -Command "(Get-Content docs\index.html) -replace '<base href=\"[^\"]*\">', '<base href=\"/CvGenerador/\">' | Set-Content docs\index.html"
  ) else (
    echo Base href verificada correctamente.
  )
  
  :: Crear archivos para GitHub Pages
  copy docs\index.html docs\404.html
  echo. > docs\.nojekyll
  
  :: Actualizar prerendered-routes.json si existe
  echo { "routes": { "/CvGenerador": {} } } > docs\prerendered-routes.json
  
  echo ¡Reconstrucción completada! La carpeta docs está lista para GitHub Pages.
) else (
  echo No se pudo encontrar la carpeta de compilación.
  
  :: Verificar si Angular generó la salida directamente en dist
  if exist dist (
    :: Listar el contenido de dist para ver su estructura
    echo Contenido de la carpeta dist:
    dir dist /b
    
    :: Si hay archivos HTML en dist, posiblemente la salida esté directamente allí
    if exist dist\index.html (
      echo Parece que los archivos se generaron directamente en dist.
      
      :: Crear o limpiar la carpeta docs
      if exist docs rmdir /s /q docs
      mkdir docs
      
      :: Copiar archivos de dist a docs
      xcopy dist\* docs\ /s /y /i
      
      :: Verificar/actualizar base href
      powershell -Command "(Get-Content docs\index.html) -replace '<base href=\"[^\"]*\">', '<base href=\"/CvGenerador/\">' | Set-Content docs\index.html"
      
      :: Crear archivos para GitHub Pages
      copy docs\index.html docs\404.html
      echo. > docs\.nojekyll
      echo { "routes": { "/CvGenerador": {} } } > docs\prerendered-routes.json
      
      echo ¡Reconstrucción completada desde dist!
    ) else (
      echo No se encontró index.html en la carpeta dist.
      echo Ejecuta el siguiente comando para ver la estructura completa:
      echo dir dist /s
    )
  ) else (
    echo No se encontró la carpeta dist. La compilación puede haber fallado.
  )
)

echo.
echo Recuerda subir los cambios a GitHub:
echo git add .
echo git commit -m "Actualizar compilación para GitHub Pages"
echo git push