function convertTime() {
  const startTimeInput = document.getElementById('startTime').value;
  const endTimeInput = document.getElementById('endTime').value;
  const inputTimeZone = document.getElementById('inputTimeZone').value;
  const resultsDiv = document.getElementById('results');

  if (!startTimeInput || !endTimeInput) {
    alert('Please select both start and end times');
    return;
  }

  // Convert input time string (local datetime) + input timezone to Date object in UTC
  // Since datetime-local inputs have no timezone info, we parse them as if they are in inputTimeZone
  // To do this accurately, we use Intl API trick:

  // Helper: parse date-time string in a specific IANA time zone to UTC Date object
  function parseZonedDateTime(dateTimeStr, timeZone) {
  const [dateTimeInput] = dateTimeStr.split('T');
  const [year, month, day] = dateTimeInput.split('-').map(Number);
  const [hour, minute] = dateTimeStr.split('T')[1].split(':').map(Number);

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

  const formattedTime = dtFormat.format(dt);
  const [formattedDate, formattedTime] = formattedTime.split(', ');
  const [formattedYear, formattedMonth, formattedDay] = formattedDate.split('/');
  const [formattedHour, formattedMinute, formattedSecond] = formattedTime.split(':');

  return new Date(
    Date.UTC(
      Number(formattedYear),
      Number(formattedMonth) - 1,
      Number(formattedDay),
      Number(formattedHour),
      Number(formattedMinute),
      Number(formattedSecond)
    )
  );
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

  // For each time zone, convert and display start and end times, and duration in hours and minutes
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
