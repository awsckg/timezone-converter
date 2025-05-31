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
    // Create a Date object with the given string as if it's in timeZone
    const [date, time] = dateTimeStr.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    // Get the offset in minutes for this timezone at this date
    const dt = new Date(Date.UTC(year, month - 1, day, hour, minute));
    // We want to get the equivalent UTC time for this local time in that time zone.
    // Use Intl.DateTimeFormat with timeZone and get offset by comparing formatted time.

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

    // Format the Date as if it's in the target timezone
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

    // Calculate the difference between the date components in UTC and in timezone
    // This difference is the offset

    const utcTimestamp = dt.getTime();

    // Now construct the local timestamp from parts in the timezone
    const localTimestamp = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond);

    // The offset is the difference between utcTimestamp and localTimestamp
    const offset = utcTimestamp - localTimestamp;

    // Adjust the original date by the offset to get the true UTC timestamp for the input time in the input timezone
    return new Date(localTimestamp);
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
