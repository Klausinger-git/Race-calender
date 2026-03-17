let events = [];

async function loadEvents() {
  const response = await fetch('data.json');
  events = await response.json();
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector('#eventsTable tbody');
  const categoryFilter = document.getElementById('categoryFilter').value;
  const classFilter = document.getElementById('classFilter').value;

  tbody.innerHTML = '';

  const filteredEvents = events.filter(event => {
    return (categoryFilter === '' || event.category === categoryFilter) &&
           (classFilter === '' || event.class === classFilter);
  });

  if (filteredEvents.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'Keine Events gefunden.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  filteredEvents.forEach(event => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${event.date}</td>
      <td>${event.event}</td>
      <td>${event.category}</td>
      <td>${event.class}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('categoryFilter').addEventListener('change', renderTable);
document.getElementById('classFilter').addEventListener('change', renderTable);

loadEvents();
