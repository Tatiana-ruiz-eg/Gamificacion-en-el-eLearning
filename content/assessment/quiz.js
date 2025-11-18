window.addEventListener('load', function() {
    scorm.init();
});

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const answers = {
        q1: this.elements.q1.value,
        q2: this.elements.q2.value
    };

    const correctAnswers = {
        q1: 'b',
        q2: 'c'
    };

    let score = 0;
    if (answers.q1 === correctAnswers.q1) score += 50;
    if (answers.q2 === correctAnswers.q2) score += 50;
    
    // Enviar datos al LMS
    scorm.setScore(score, 0, 100);
    scorm.set('cmi.core.lesson_status', 'completed');
    
    const masteryScore = 80;
    const resultDiv = document.getElementById('result');
    
    if (score >= masteryScore) {
        scorm.setStatus('passed');
        resultDiv.textContent = `¡Felicidades! Aprobaste con ${score}%.`;
        resultDiv.className = 'result passed';
    } else {
        scorm.setStatus('failed');
        resultDiv.textContent = `No has alcanzado la puntuación mínima. Tu puntuación es ${score}%.`;
        resultDiv.className = 'result failed';
    }

    scorm.finish();
    
    // Mostrar resultado y deshabilitar el formulario
    resultDiv.style.display = 'block';
    this.querySelector('button').disabled = true;
});

window.addEventListener('beforeunload', function() {
    scorm.finish();
});