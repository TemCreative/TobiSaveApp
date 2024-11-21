// app.js
const registrationForm = document.getElementById('registrationForm');
const memberList = document.getElementById('memberList');
const totalSavingsEl = document.getElementById('totalSavings');

let members = [];
let totalSavings = 0;

const tiers = {
  1: { amount: 10000, interest: 0.05 },
  2: { amount: 20000, interest: 0.10 },
  3: { amount: 30000, interest: 0.20 },
};

// Handle registration
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('studentName').value;
  const tier = document.getElementById('tierSelect').value;

  if (!name || !tier) {
    alert('Please enter a valid name and select a tier.');
    return;
  }

  const { amount, interest } = tiers[tier];
  
  members.push({ name, tier, amount, interest });
  totalSavings += amount;

  updateDashboard();
  registrationForm.reset();
});

// Update the dashboard
function updateDashboard() {
  memberList.innerHTML = '';
  members.forEach((member, index) => {
    const weeklyInterest = member.amount * member.interest;
    const totalWithdrawable = member.amount + weeklyInterest;

    const row = `
      <tr>
        <td>${member.name}</td>
        <td>Tier ${member.tier}</td>
        <td>${member.amount} Naira</td>
        <td>${weeklyInterest.toFixed(2)} Naira</td>
        <td>${totalWithdrawable.toFixed(2)} Naira</td>
        <td>
          <button class="withdraw" onclick="withdrawMember(${index})">Withdraw</button>
        </td>
      </tr>
    `;
    memberList.innerHTML += row;
  });

  totalSavingsEl.textContent = totalSavings.toFixed(2);
}

// Handle member withdrawal
function withdrawMember(index) {
  const member = members[index];
  totalSavings -= member.amount;
  members.splice(index, 1);

  updateDashboard();
}
