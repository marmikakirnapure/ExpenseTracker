const API_URL = "https://your-backend-name.onrender.com/expenses"; // change to your backend URL

// Fetch expenses on load
window.onload = fetchExpenses;

async function fetchExpenses() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    let total = 0;

    data.forEach(exp => {
        total += exp.amount;

        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.title} - ₹${exp.amount}
            <button class="delete-btn" onclick="deleteExpense('${exp._id}')">X</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

// Add expense
async function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    if (!title || !amount) {
        alert("Please fill all fields");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, amount })
    });

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    fetchExpenses();
}

// Delete expense
async function deleteExpense(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchExpenses();
}
