const tips = [
    "Hydrate your skin with a light mist throughout the day.",
    "Double cleanse at night to remove makeup and impurities.",
    "Apply sunscreen every morning, even indoors.",
    "Exfoliate weekly for a radiant glow.",
    "Listen to your skin—it knows what it needs."
];

let moodChart;
const isPremium = false; // Placeholder; integrate with auth later

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

    if (isPremium) {
        updateMoodChart();
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        alert(`Entry added!\nTip: ${randomTip}`);
    } else {
        alert('Entry added! Upgrade to Premium for mood trends and tips.');
    }
});

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${entry.timeOfDay} - ${entry.routine}: ${entry.product} (Condition: ${entry.condition}${isPremium ? `, Mood: ${entry.mood}` : ''}) - ${entry.timestamp}`;
        if (isPremium) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                deleteEntry(index);
                updateMoodChart();
            };
            li.appendChild(deleteBtn);
        }
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
        if (isPremium) updateMoodChart();
    }
});

function updateMoodChart() {
    document.getElementById('chart-container').style.display = 'block';
    document.getElementById('premium-teaser').style.display = 'none';

    const history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    const moodCounts = {
        Glowy: 0,
        Dry: 0,
        Oily: 0,
        Tired: 0,
        Balanced: 0
    };

    history.forEach(entry => {
        moodCounts[entry.mood]++;
    });

    const ctx = document.getElementById('moodChart').getContext('2d');
    if (moodChart) moodChart.destroy();

    moodChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Glowy', 'Dry', 'Oily', 'Tired', 'Balanced'],
            datasets: [{
                label: 'Skin Mood Frequency',
                data: [moodCounts.Glowy, moodCounts.Dry, moodCounts.Oily, moodCounts.Tired, moodCounts.Balanced],
                backgroundColor: '#6f0936',
                borderColor: '#4a0624',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#6f0936'
                    }
                }
            }
        }
    });
}

window.onload = function() {
    displayHistory();
    if (isPremium) updateMoodChart();
    else {
        document.getElementById('chart-container').style.display = 'none';
        document.getElementById('premium-teaser').style.display = 'block';
    }
};