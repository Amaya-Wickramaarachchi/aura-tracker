document.getElementById('skincare-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('product-name').value;
    const timestamp = new Date().toLocaleString();
    const entry = { product: productName, time: timestamp };
    console.log('Entry added:', entry);

    let history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.push(entry);
    localStorage.setItem('skincareHistory', JSON.stringify(history));
    console.log('Total entries:', history.length); // Custom metric

    document.getElementById('product-name').value = '';
    displayHistory();
});

function displayHistory() {
    console.log('Displaying history');
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    const history = JSON.parse(localStorage.getItem('skincareHistory')) || [];
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.product} - ${entry.time}`;
        historyList.appendChild(li);
    });
}

window.onload = displayHistory;