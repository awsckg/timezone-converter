function convertTime() {
  const startTimeInput = document.getElementById('startTime').value;
  const endTimeInput = document.getElementById('endTime').value;
  const inputTimeZone = document.getElementById('inputTimeZone').value;
  const resultsDiv = document.getElementById('results');

  if (!startTimeInput || !endTimeInput) {
    alert('Please select both start and end times');
    return;
  }

  // Parse date-time string in a specific IANA time zone
  function parseZonedDateTime(dateTimeStr, timeZone) {
    const date = new Date(dateTimeStr); // parse as local datetime
    const options = {
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };

    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
    const values = {};
    parts.forEach(({ type, value }) => {
      values[type] = parseInt(value, 10);
    });

    return new Date(Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute, values.second));
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

  // Epoch times
  html += `
    <div class="time-segment epoch-segment">
      <h3>⏱️ EPOCH Time (milliseconds since Jan 1, 1970 UTC)</h3>
      <p><strong>Start:</strong> ${startUTC.getTime()} ms</p>
      <p><strong>End:</strong> ${endUTC.getTime()} ms</p>
      <p><strong>Duration:</strong> ${endUTC.getTime() - startUTC.getTime()} ms</p>
    </div>
  `;

  // For each time zone
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
