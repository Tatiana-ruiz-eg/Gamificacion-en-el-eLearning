// Este script se puede reutilizar en todos los módulos de lecciones.

window.addEventListener('load', function() {
    // Inicia la comunicación con el LMS
    scorm.init();
    
    // Comprueba si esta lección ya fue completada para deshabilitar el botón
    const lessonStatus = scorm.get('cmi.core.lesson_status');
    if (lessonStatus === 'completed' || lessonStatus === 'passed') {
        const completeBtn = document.getElementById('completeBtn');
        completeBtn.textContent = "Lección Completada";
        completeBtn.disabled = true;
    }
});

// Añade el evento al botón
document.getElementById('completeBtn').addEventListener('click', function() {
    // 1. Marca la lección como 'completed'
    scorm.setStatus('completed');
    
    // 2. Guarda los datos y finaliza la comunicación de este SCO
    scorm.finish();
    
    // 3. Informa al usuario y deshabilita el botón
    this.textContent = "¡Guardado! Avanzando...";
    this.disabled = true;

    // AVISO IMPORTANTE:
    // No forzamos la navegación con JavaScript (ej. window.location).
    // Al llamar a scorm.finish(), el LMS (el sistema que corre el curso)
    // detecta que el SCO terminó y es RESPONSABLE de cargar el siguiente 
    // módulo según el orden del imsmanifest.xml. Esto asegura la máxima compatibilidad.
});

// Como buena práctica, asegúrate de que los datos se guarden si el usuario cierra la ventana
window.addEventListener('beforeunload', function() {
    scorm.finish();
});