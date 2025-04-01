const tips = [
    "Hydrate your skin with a light mist throughout the day.",
    "Double cleanse at night to remove makeup and impurities.",
    "Apply sunscreen every morning, even indoors.",
    "Exfoliate weekly for a radiant glow.",
    "Listen to your skin—it knows what it needs."
];

document.getElementById('skincare-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const routineStep = document.getElementById('routine-step').value;
    const productName = document.getElementById('product-name').value;
    const skinCondition = document.getElementById('skin-condition').value || 'None';
    const skinMood = document.getElementById('skin-mood').value;
    const timeOfDay = document.querySelector('input[name="time-of-day"]:checked').value;
    const timestamp = new Date().toLocaleString();

    const entry = {
        routine: routineStep,
        product: productName,
        condition: skinCondition,
        mood: skinMood,
        timeOfDay: timeOfDay,
        timestamp: timestamp
    };

    let history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.push(entry);
    localStorage.setItem('skincareHistory', JSON.stringify(history));

    document.getElementById('skincare-form').reset();
    displayHistory();

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    alert(`Entry added!\nTip: ${randomTip}`);
});

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${entry.timeOfDay} - ${entry.routine}: ${entry.product} (Condition: ${entry.condition}, Mood: ${entry.mood}) - ${entry.timestamp}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteEntry(index);
        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    });
}

function deleteEntry(index) {
    let history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('skincareHistory', JSON.stringify(history));
    displayHistory();
}

document.getElementById('clear-history').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear your skincare history?')) {
        localStorage.removeItem('skincareHistory');
        displayHistory();
    }
});

window.onload = displayHistory;