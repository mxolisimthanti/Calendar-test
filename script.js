// Show today's date
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('today-date').textContent = `Today is ${today.toLocaleDateString('en-ZA', options)}`;

// Fetch South African holidays from HolidayAPI
const API_KEY = 'c52c6e36-fba9-4b1e-8d1f-57208e4397df';
const COUNTRY = 'ZA';
const YEAR = today.getFullYear();

fetch(`https://holidayapi.com/v1/holidays?key=${API_KEY}&country=${COUNTRY}&year=${YEAR}`)
  .then(response => response.json())
  .then(data => {
    const holidays = data.holidays;
    const list = document.getElementById('holiday-list');

    holidays.forEach(holiday => {
      const li = document.createElement('li');
      li.textContent = `${holiday.date} – ${holiday.name}`;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching holidays:', error));

// Load school events from local JSON
fetch('events.json')
  .then(response => response.json())
  .then(events => {
    const list = document.getElementById('event-list');
    events.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.date} – ${event.title}`;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading school events:', error));
function updateClock() {
  const now = new Date();
  document.getElementById('live-clock').textContent =
    `Time: ${now.toLocaleTimeString('en-ZA')}`;
}
setInterval(updateClock, 1000);
