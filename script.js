// World Clock live update function
function updateWorldClocks() {
  const cities = {
    london: 'Europe/London',
    newyork: 'America/New_York',
    tokyo: 'Asia/Tokyo',
    mumbai: 'Asia/Kolkata',
    sydney: 'Australia/Sydney',
    singapore: 'Asia/Singapore'
  };

  for (const [id, tz] of Object.entries(cities)) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    document.getElementById(id).textContent = timeStr;
  }
}

updateWorldClocks();
setInterval(updateWorldClocks, 1000);


// Convert Time function
function convertTime() {
  const inputTimeZone = document.getElementById('inputTimeZone').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  if (!startTime || !endTime) {
    alert('Please select both start and end times');
    return;
  }

  // Helper to parse datetime-local as Date in specified timezone
  function parseDateInTimeZone(dateTimeLocal, timeZone) {
    const [date, time] = dateTimeLocal.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const parts = dtf.formatToParts(utcDate);
    let tzYear, tzMonth, tzDay, tzHour, tzMinute, tzSecond;
    for (const part of parts) {
      if (part.type === 'year') tzYear = Number(part.value);
      else if (part.type === 'month') tzMonth = Number(part.value);
      else if (part.type === 'day') tzDay = Number(part.value);
      else if (part.type === 'hour') tzHour = Number(part.value);
      else if (part.type === 'minute') tzMinute = Number(part.value);
      else if (part.type === 'second') tzSecond = Number(part.value);
    }
    const inputLocalDate = new Date(year, month - 1, day, hour, minute, 0);
    const tzLocalDate = new Date(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond);
    const offsetMs = inputLocalDate - tzLocalDate;
    return new Date(utcDate.getTime() + offsetMs);
  }

  const startDate = parseDateInTimeZone(startTime, inputTimeZone);
  const endDate = parseDateInTimeZone(endTime, inputTimeZone);

  if (endDate < startDate) {
    alert('End time cannot be earlier than start time');
    return;
  }

  const timeZones = {
    'IST': 'Asia/Kolkata',
    'UTC': 'UTC',
    'PST': 'America/Los_Angeles',
    'UK': 'Europe/London',
    'AEST': 'Australia/Sydney',
    'SGT': 'Asia/Singapore',
    'CET': 'Europe/Paris',
    'EET': 'Europe/Helsinki',
    'WET': 'Europe/Lisbon'
  };

  let results = `<h2 class="results-title">Converted Times:</h2>`;

  // Epoch times
  results += `
    <div class="time-segment epoch-segment">
      <h3>🕒 Epoch Time</h3>
      <p><strong>Start:</strong> ${startDate.getTime()} ms</p>
      <p><strong>End:</strong> ${endDate.getTime()} ms</p>
      <p><strong>Duration:</strong> ${endDate.getTime() - startDate.getTime()} ms</p>
    </div>
  `;

  const convertedTimes = {};

  for (const [abbr, tz] of Object.entries(timeZones)) {
    const options = {
      timeZone: tz,
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const startStr = startDate.toLocaleString('en-US', options);
    const endStr = endDate.toLocaleString('en-US', options);

    convertedTimes[abbr] = {
      start: new Date(startDate.toLocaleString('en-US', { timeZone: tz })),
      end: new Date(endDate.toLocaleString('en-US', { timeZone: tz })),
    };

    results += `
      <div class="time-segment">
        <h3>${abbr} (${tz})</h3>
        <p><strong>Start:</strong> ${startStr}</p>
        <p><strong>End:</strong> ${endStr}</p>
      </div>
    `;
  }

  // Time differences
  results += `<div class="time-differences"><h3>🕓 Time Differences</h3><ul>`;
  const tzKeys = Object.keys(convertedTimes);
  for (let i = 0; i < tzKeys.length; i++) {
    for (let j = i + 1; j < tzKeys.length; j++) {
      const a = tzKeys[i], b = tzKeys[j];
      const diffMs = convertedTimes[a].start - convertedTimes[b].start;
      const diffHrs = (diffMs / (1000 * 60 * 60)).toFixed(1);
      results += `<li><strong>${a} → ${b}:</strong> ${diffHrs} hours</li>`;
    }
  }
  results += `</ul></div>`;

  document.getElementById('results').innerHTML = results;
}
