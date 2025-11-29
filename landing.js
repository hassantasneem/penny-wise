// Expense data storage
let expenses = [];
let chart = null;

// CHart colours
const categoryColors = {
    'Food & Drinks': '#e91e63',
    'Shopping': '#673ab7',
    'Utilities': '#03a9f4',
    'Transport': '#009688',
    'Entertainment': '#ff5722',
};

document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
    setupEventListeners();
    updateDashboard();  
});

function navigateWithTransition(url) {
    const container = document.getElementById('transition-container');
    container.style.pointerEvents = 'all';
    
    const panel = document.createElement('div');
    panel.className = 'slide-panel';
    panel.innerHTML = `
        <div class="slide-panel-logo">
            <img src="w_pennywise.png" alt="PennyWise">
        </div>
        <div class="loading-bar-container">
            <div class="loading-bar"></div>
        </div>
        <div class="loading-text">Loading...</div>
    `;
    container.appendChild(panel);
    
    setTimeout(() => {
        window.location.href = url;
    }, 2000);
}

document.getElementById('nav-button').addEventListener('click', function() {
    navigateWithTransition('transitions.html');
});

function setupEventListeners() {
    const addBtn = document.getElementById('add-btn');
    const closeModal = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const expenseForm = document.getElementById('expense-form');

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalHandler();
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModalHandler();
        }
    });

    expenseForm.addEventListener('submit', handleFormSubmit);
    document.getElementById('input-date').valueAsDate = new Date();
}

function openModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('input-desc').focus();
    }, 100);
}

function closeModalHandler() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.add('hidden');
    document.getElementById('expense-form').reset();
    document.getElementById('input-date').valueAsDate = new Date();
}

function handleFormSubmit(e) {
    e.preventDefault();

    const description = document.getElementById('input-desc').value;
    const amount = parseFloat(document.getElementById('input-amount').value);
    const category = document.getElementById('input-category').value;
    const date = document.getElementById('input-date').value;

    const expense = {
        id: Date.now(),
        description,
        amount,
        category,
        date
    };

    expenses.push(expense);
    saveExpenses();
    updateDashboard();
    closeModalHandler();
}

function loadExpenses() {
    expenses = [];
}

function saveExpenses() {
    // Data persists only during the session
}

function updateDashboard() {
    updateNetBalance();
    updateExpenseList();
    updateCategoryBreakdown();
    updateChart();
}

function updateNetBalance() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById('tot-balance').textContent = `Rs. ${total.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-tbl');
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        expenseList.innerHTML = '<li class="empty-state">No expenses yet. Click "+ Add Expense" to get started!</li>';
        return;
    }

    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.style.cursor = 'pointer';
        li.innerHTML = `
    <div class="item-left">
        <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background-color: ${categoryColors[expense.category]}20; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                ${getCategoryIcon(expense.category)}
            </div>
            <span>${expense.description}</span>
        </div>
    </div>
    <div class="item-right">
        <span>${expense.category}</span>
        <span>Rs. ${expense.amount.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span>${formatDate(expense.date)}</span>
    </div>
`;

        li.addEventListener('click', function (e) {
            e.stopPropagation();
            if (confirm(`Delete "${expense.description}"?`)) {
                deleteExpense(expense.id);
            }
        });

        expenseList.appendChild(li);
    });
}

function getCategoryIcon(category) {
    const icons = {
        'Food & Drinks': 'fa-solid fa-burger',
        'Shopping': 'fa-solid fa-bag-shopping',
        'Utilities': 'fa-solid fa-lightbulb',
        'Transport': 'fa-solid fa-car-side',
        'Entertainment': 'fa-solid fa-film'
    };

    const iconClass = icons[category] || 'fa-solid fa-money-bill-wave';
    return `<i class="${iconClass}"></i>`;
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    updateDashboard();
}

function updateCategoryBreakdown() {
    const analysisGrid = document.getElementById('analysis-grid');
    analysisGrid.innerHTML = '';

    const categoryTotals = {};
    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

    Object.entries(categoryTotals).forEach(([category, amount]) => {
        const percentage = ((amount / totalExpenses) * 100).toFixed(1);
        const card = document.createElement('div');
        card.className = 'grid-card';
        card.innerHTML = `
            <h4>${category}</h4>
            <p>Rs. ${amount.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <div style="width: 100%; height: 8px; background-color: #f0f0f0; border-radius: 4px; overflow: hidden; margin-top: auto;">
                <div style="height: 100%; background-color: ${categoryColors[category]}; width: ${percentage}%; transition: width 0.3s ease;"></div>
            </div>
            <div style="text-align: center; font-size: 0.85em; color: #666; font-weight: 600; margin-top: 4px;">${percentage}%</div>
        `;
        analysisGrid.appendChild(card);
    });
}

function updateChart() {
    const categoryTotals = {};
    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const colors = labels.map(label => categoryColors[label]);

    const chartContainer = document.getElementById('analysis-chart');

    if (data.length === 0) {
        if (chart) {
            chart.destroy();
            chart = null;
        }
        chartContainer.innerHTML = `
            <div class="chart-empty-state">
                <i class="fa-solid fa-chart-pie" style="font-size: 3em; color: #ccc; margin-bottom: 10px;"></i>
                <p style="color: #888; margin: 0;">No expense data yet.</p>
            </div>
        `;
        return;
    }

    let canvas = document.getElementById('myChart');

    if (!canvas) {
        chartContainer.innerHTML = '<canvas id="myChart"></canvas>';
        canvas = document.getElementById('myChart');
    }

    const ctx = canvas.getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}