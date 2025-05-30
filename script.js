function convertTime() {
    const startTimeInput = document.getElementById('startTime').value;
    const endTimeInput = document.getElementById('endTime').value;
    const inputTimeZone = document.getElementById('inputTimeZone').value;

    if (!startTimeInput || !endTimeInput) {
        alert('Please select both start and end times');
        return;
    }

    // Convert input times to UTC based on selected time zone
    const startUTC = zonedTimeToUtc(startTimeInput, inputTimeZone);
    const endUTC = zonedTimeToUtc(endTimeInput, inputTimeZone);

    if (endUTC < startUTC) {
        alert('End time cannot be earlier than start time');
        return;
    }

    // Define time zones
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

    let results = '<h2 class="results-title">Converted Times:</h2>';

    // Epoch Time
    results += `
        <div class="time-segment epoch-segment">
            <h3><i class="fas fa-clock"></i> EPOCH Time</h3>
            <p><strong>Start:</strong> ${startUTC.getTime()} ms</p>
            <p><strong>End:</strong> ${endUTC.getTime()} ms</p>
            <p><strong>Duration:</strong> ${endUTC.getTime() - startUTC.getTime()} ms</p>
        </div>`;

    // Store converted times
    let convertedTimes = {};

    for (let [zone, region] of Object.entries(timeZones)) {
        try {
            const startOptions = {
                timeZone: region,
                hour12: true,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2
::contentReference[oaicite:27]{index=27}
 
