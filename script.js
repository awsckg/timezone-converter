function convertTime() {
  const inputTimeZone = document.getElementById('inputTimeZone').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  // Validate input
  if (!startTime || !endTime) {
    alert('Please select both start and end times');
    return;
  }

  // Parse input times as if they are in the selected input time zone
  // Trick: build date strings with 'Z' UTC suffix by converting input local time from inputTimeZone to UTC
  // Because HTML input datetime-local gives local date/time without timezone info,
  // we must interpret it as if it's in the input timezone.

  // Helper to parse datetime-local as Date in specified timezone
  function parseDateInTimeZone(dateTimeLocal, timeZone) {
    // dateTimeLocal format: "YYYY-MM-DDTHH:mm"
    // Create a Date object using Intl API to get equivalent UTC time for the given tz
    const [date, time] = dateTimeLocal.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    // Use Date.UTC but adjust with timezone offset
    // To get the exact UTC timestamp of the input local time in the given timezone,
    // we can use Intl.DateTimeFormat with timeZone and formatToParts.

    // Create a Date at UTC that matches the local time if interpreted in the timezone
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

    // Find offset between UTC and the timeZone at that date-time
    const dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const parts = dtf.formatToParts(utcDate);
    // Extract the formatted parts
    let tzYear, tzMonth, tzDay, tzHour, tzMinute, tzSecond;
    for (const part of parts) {
      if (part.type === 'year') tzYear = Number(part.value);
      else if (part.type === 'month') tzMonth = Number(part.value);
      else if (part.type === 'day') tzDay = Number(part.value);
      else if (part.type === 'hour') tzHour = Number(part.value);
      else if (part.type === 'minute') tzMinute = Number(part.value);
      else if (part.type === 'second') tzSecond = Number(part.value);
    }

    // Now build a Date that would be interpreted as the timeZone local time at utcDate
    // If the tz date parts do not match input, adjust utcDate by difference in milliseconds

    // Calculate difference in ms between input local time and the timeZone interpretation
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

  // Time zones to convert to (same as options but with codes)
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

  // Show EPOCH time for original start and end in ms
  results += `
    <div class="time-segment epoch-segment">
      <h3><i class="fas fa-clock"></i> EPOCH Time</h3>
      <p><strong>Start:</strong> ${startDate.getTime()} ms</p>
      <p><strong>End:</strong> ${endDate.getTime()} ms</p>
      <p><strong>Duration:</strong> ${endDate.getTime() - startDate.getTime()} ms</p>
    </div>
  `;

  // Store converted dates for difference calculation
  const convertedTimes = {};

  for (const [abbr, tz] of Object.entries(timeZones)) {
    try {
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

      // Also store converted Date objects for diff calc
      convertedTimes[abbr] = {
        start: new Date(startDate.toLocaleString('en-US', { timeZone: tz })),
        end: new Date(endDate.toLocaleString('en-US', { time
