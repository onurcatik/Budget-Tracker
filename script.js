const budgetForm = document.getElementById('budget-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');
const spendingChartCtx = document.getElementById('spending-chart').getContext('2d');

let incomes = [];
let expenses = [];

budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTransaction();
});

function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (type === 'income') {
        incomes.push({ description, amount });
    } else {
        expenses.push({ description, amount });
    }

    updateSummary();
    updateChart();
    budgetForm.reset();
}

function updateSummary() {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = totalIncome - totalExpenses;

    totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
    balanceEl.textContent = `$${balance.toFixed(2)}`;
}

function updateChart() {
    const chartData = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            data: [
                incomes.reduce((sum, income) => sum + income.amount, 0),
                expenses.reduce((sum, expense) => sum + expense.amount, 0)
            ],
            backgroundColor: ['#4caf50', '#f44336']
        }]
    };

    new Chart(spendingChartCtx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true
        }
    });
}
