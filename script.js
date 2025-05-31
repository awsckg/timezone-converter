// Function to update world clocks
function updateWorldClocks() {
    const now = new Date();
    
    // Format options for time display
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    // London (UTC+1 during summer)
    const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
    document.getElementById('london-time').textContent = londonTime.toLocaleString('en-US', options);
    
    // New York (UTC-4 during summer)
    const newYorkTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    document.getElementById('newyork-time').textContent = newYorkTime.toLocaleString('en-US', options);
    
    // Tokyo (UTC+9)
    const tokyoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    document.getElementById('tokyo-time').textContent = tokyoTime.toLocaleString('en-US', options);
    
    // Mumbai (UTC+5:30)
    const mumbaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    document.getElementById('mumbai-time').textContent = mumbaiTime.toLocaleString('en-US', options);

    // Sydney (Australia)
const sydneyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
document.getElementById('sydney-time').textContent = sydneyTime.toLocaleString('en-US', options);

// Singapore
const singaporeTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
document.getElementById('singapore-time').textContent = singaporeTime.toLocaleString('en-US', options);

}

// Update world clocks every second
setInterval(updateWorldClocks, 1000);

// Initial call to display times immediately
updateWorldClocks();

// Time Zone Converter Function
function convertTime() {
  const startTimeInput = document.getElementById('startTime').value;
  const endTimeInput = document.getElementById('endTime').value;
  const inputTimeZone = document.getElementById('inputTimeZone').value;
  const resultsDiv = document.getElementById('results');

  if (!startTimeInput || !endTimeInput) {
    alert('Please select both start and end times');
    return;
  }

  // Helper: parse date-time string in a specific IANA time zone to UTC Date object
  function parseZonedDateTime(dateTimeStr, timeZone) {
    const [date, time] = dateTimeStr.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    const dt = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const dtFormat = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const parts = dtFormat.formatToParts(dt);
    let tzYear, tzMonth, tzDay, tzHour, tzMinute, tzSecond;

    for (const part of parts) {
      if (part.type === 'year') tzYear = Number(part.value);
      else if (part.type === 'month') tzMonth = Number(part.value);
      else if (part.type === 'day') tzDay = Number(part.value);
      else if (part.type === 'hour') tzHour = Number(part.value);
      else if (part.type === 'minute') tzMinute = Number(part.value);
      else if (part.type === 'second') tzSecond = Number(part.value);
    }

    const utcTimestamp = dt.getTime();
    const localTimestamp = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond);
    const offset = utcTimestamp - localTimestamp;

    return new Date(utcTimestamp - offset);
  }

  const startUTC = parseZonedDateTime(startTimeInput, inputTimeZone);
  const endUTC = parseZonedDateTime(endTimeInput, inputTimeZone);

  if (endUTC < startUTC) {
    alert('End time cannot be earlier than start time');
    return;
  }

  const timeZones = {
    IST: 'Asia/Kolkata',
    UTC: 'UTC',
    PST: 'America/Los_Angeles',
    UK: 'Europe/London',
    AEST: 'Australia/Sydney',
    SGT: 'Asia/Singapore',
    CET: 'Europe/Paris',
    EET: 'Europe/Helsinki',
    WET: 'Europe/Lisbon',
  };

  let html = `<h2 class="results-title">Converted Times:</h2>`;

  html += `
    <div class="time-segment epoch-segment">
      <h3>⏱️ EPOCH Time (milliseconds since Jan 1, 1970 UTC)</h3>
      <p><strong>Start:</strong> ${startUTC.getTime()} ms</p>
      <p><strong>End:</strong> ${endUTC.getTime()} ms</p>
      <p><strong>Duration:</strong> ${endUTC.getTime() - startUTC.getTime()} ms</p>
    </div>
  `;

  for (const [zoneAbbr, tzName] of Object.entries(timeZones)) {
    const startStr = startUTC.toLocaleString('en-US', {
      timeZone: tzName,
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const endStr = endUTC.toLocaleString('en-US', {
      timeZone: tzName,
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const durationMs = endUTC - startUTC;
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    html += `
      <div class="time-segment">
        <h3>${zoneAbbr} (${tzName})</h3>
        <p><strong>Start:</strong> ${startStr}</p>
        <p><strong>End:</strong> ${endStr}</p>
        <p><strong>Duration:</strong> ${durationHours}h ${durationMinutes}m</p>
      </div>
    `;
  }

  resultsDiv.innerHTML = html;
}
