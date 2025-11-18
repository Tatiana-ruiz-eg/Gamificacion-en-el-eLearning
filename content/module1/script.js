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
    
    // --- CAMBIO: FORZAR NAVEGACIÓN ---
    // Esta línea solicita explícitamente al LMS que navegue al siguiente SCO.
    // Es la forma estándar de "forzar" la navegación.
    // ADVERTENCIA: No todos los LMS respetan esta solicitud, pero es la forma correcta de pedirlo.
    scorm.set('cmi.nav.request', 'continue');
    
    // 3. Guarda los datos y finaliza la comunicación de este SCO (lección).
    scorm.finish();
    // módulo según el orden del imsmanifest.xml. Esto asegura la máxima compatibilidad.
});

// Como buena práctica, asegúrate de que los datos se guarden si el usuario cierra la ventana
window.addEventListener('beforeunload', function() {
    scorm.finish();
});