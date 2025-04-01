document.getElementById('skincare-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const routineStep = document.getElementById('routine-step').value;
    const productName = document.getElementById('product-name').value;
    const skinCondition = document.getElementById('skin-condition').value || 'None';
    const timeOfDay = document.querySelector('input[name="time-of-day"]:checked').value;
    const timestamp = new Date().toLocaleString();

    const entry = {
        routine: routineStep,
        product: productName,
        condition: skinCondition,
        timeOfDay: timeOfDay,
        timestamp: timestamp
    };

    let history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.push(entry);
    localStorage.setItem('skincareHistory', JSON.stringify(history));

    document.getElementById('skincare-form').reset();
    displayHistory();
});

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.timeOfDay} - ${entry.routine}: ${entry.product} (Condition: ${entry.condition}) - ${entry.timestamp}`;
        historyList.appendChild(li);
    });
}

window.onload = displayHistory;