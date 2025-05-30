function convertTime() {
  const startTimeInput = document.getElementById('startTime').value;
  const endTimeInput = document.getElementById('endTime').value;
  const inputTimeZone = document.getElementById('inputTimeZone').value;

  if (!startTimeInput || !endTimeInput) {
    alert('Please select both start and end times');
    return;
  }

  const startDate = new Date(startTimeInput);
  const endDate = new Date(endTimeInput);

  if (endDate < startDate) {
    alert('End time cannot be earlier than start time');
    return;
  }

  // List of time zones to convert to
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

  // Helper to convert local input datetime + timezone to UTC date object
  // Using Intl.DateTimeFormat with timeZone option and parsed local datetime string
  // Because <input type="datetime-local"> returns local time without tz info,
  // we create a Date object and then adjust it using the selected input timezone.
  // We'll use the `toLocaleString` trick and `Date.parse` to get correct UTC.

  // Convert the start and end local input times from inputTimeZone to UTC
  function convertToUTC(localDateTimeStr, timeZone) {
    // Parse the input (YYYY-MM-DDTHH:mm)
    const [datePart, timePart] = localDateTimeStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    // Build a date object from the components (assumed as if in timeZone)
    // Using Date.toLocaleString with timeZone to get offset

    // Build a date object at UTC equivalent for the timeZone input time
    const utcStr = new Date(Date.UTC(year, month - 1, day, hour, minute));

    // Get the offset in minutes between timeZone and UTC at this time
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Format the date in the target timezone and parse the offset
    const parts = formatter.formatToParts(utcStr);
    let offsetSign = 1;
    let offsetHours = 0;
    let offsetMinutes = 0;

    for (const part of parts) {
      if (part.type === 'timeZoneName') {
        // Extract offset like GMT+05:30 or GMT-07:00
        const match = part.value.match(/GMT([+-])(\d{2}):(\d{2})/);
        if (match) {
          offsetSign = match[1] === '+' ? 1 : -1;
          offsetHours = parseInt(match[2], 10);
          offsetMinutes = parseInt(match[3], 10);
        }
      }
    }

    // Calculate total offset in milliseconds
    const totalOffsetMs = offsetSign * (offsetHours * 60 + offsetMinutes) * 60 * 1000;

    // Adjust utcStr by subtracting the offset to get the real UTC time of input datetime
    return new Date(utcStr.getTime() - totalOffsetMs);
  }

  const startUTC = convertToUTC(startTimeInput, inputTimeZone);
  const endUTC = convertToUTC(endTimeInput, inputTimeZone);

  // Start building result HTML
  let results = `<h2 class="results-title">Converted Times:</h2>`;

  // Show epoch times
  results += `
    <div class="time-segment epoch-segment">
      <h3>⏳ Epoch Time (milliseconds since 1970-01-01 UTC)</h3>
      <p><strong>Start:</strong> ${startUTC.getTime()}</p>
      <p><strong>End:</strong> ${endUTC.getTime()}</p>
      <p><strong>Duration:</strong> ${endUTC.getTime() - startUTC.getTime()} ms</p>
    </div>
  `;

  // Function to format date in a timezone
  function formatDateInTimeZone(date, timeZone) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  }

  // Show converted start and end times in all time zones
  for (const [zoneName, zoneId] of Object.entries(timeZones)) {
    const startFormatted = formatDateInTimeZone(startUTC, zoneId);
    const endFormatted = formatDateInTimeZone(endUTC, zoneId);

    // Calculate difference in hours and minutes from input timezone
    const inputOffsetMs = startUTC - convertToUTC(startTimeInput, inputTimeZone);
    const zoneOffsetMs = startUTC - convertToUTC(startTimeInput, zoneId);
    const diffMs = zoneOffsetMs - inputOffsetMs;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.abs(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)));

    // Prepare difference string
    const diffString = diffMs === 0 ? 'Same as input timezone' :
      (diffMs > 0 ? '+' : '-') + `${Math.abs(diffHours)}h ${diffMinutes}m`;

    results += `
      <div class="time-segment">
        <h3>${zoneName} (${zoneId})</h3>
        <p><strong>Start:</strong> ${startFormatted}</p>
        <p><strong>End:</strong> ${endFormatted}</p>
        <p><strong>Time Difference from Input TZ:</strong> ${diffString}</p>
      </div>
    `;
  }

  document.getElementById('results').innerHTML = results;
}
