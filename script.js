// Define time zones with corresponding flags
const timeZones = {
  'IST': { region: 'Asia/Kolkata', flag: '🇮🇳' },
  'UTC': { region: 'UTC', flag: '🌍' },
  'PST': { region: 'America/Los_Angeles', flag: '🇺🇸' },
  'UK': { region: 'Europe/London', flag: '🇬🇧' },
  'AEST': { region: 'Australia/Sydney', flag: '🇦🇺' },
  'SGT': { region: 'Asia/Singapore', flag: '🇸🇬' },
  'CET': { region: 'Europe/Paris', flag: '🇫🇷' },
  'EET': { region: 'Europe/Helsinki', flag: '🇫🇮' },
  'WET': { region: 'Europe/Lisbon', flag: '🇵🇹' }
};

// Set default times on page load
window.onload = function () {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const istNow = new Date(now.getTime() + offset + (5.5 * 60 * 60000));
  const istEnd = new Date(istNow.getTime() + 60 * 60 * 1000);

  document.getElementById('startTime').value = istNow.toISOString().slice(0, 16);
  document.getElementById('endTime').value = istEnd.toISOString().slice(0, 16);
};

function convertTime() {
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const baseTimeZone = document.getElementById('baseTimeZone').value;

  if (!startTime || !endTime) {
    alert('Please select both start and end times');
    return;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end < start) {
    alert('End time cannot be earlier than start time');
    return;
  }

  let results = '<h2 class="results-title">Converted Times:</h2>';

  // EPOCH Time
  results += `
    <div class="time-segment epoch-segment">
      <h3><i class="fas fa-clock"></i> EPOCH Time</h3>
      <p><strong>Start:</strong> ${start.getTime()} ms</p>
      <p><strong>End:</strong> ${end.getTime()} ms</p>
      <p><strong>Duration:</strong> ${end.getTime() - start.getTime()} ms</p>
    </div>`;

  // Current Time
  const currentTime = new Date();
  results += `
    <div class="time-segment">
      <h3><i class="fas fa-clock"></i> Current Time</h3>
      <p><strong>Local:</strong
::contentReference[oaicite:0]{index=0}
 
