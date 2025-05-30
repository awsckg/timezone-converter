function convertTime() {
    const startTimeInput = document.getElementById('startTime').value;
    const endTimeInput = document.getElementById('endTime').value;
    const inputTimeZone = document.getElementById('inputTimeZone').value;

    if (!startTimeInput || !endTimeInput) {
        alert('Please select both start and end times');
        return;
    }

    // Convert input times to UTC
    const startUTC = dateFnsTz.zonedTimeToUtc(startTimeInput, inputTimeZone);
    const endUTC = dateFnsTz.zonedTimeToUtc(endTimeInput, inputTimeZone);

    if (endUTC < startUTC) {
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

    let results = '<h2 class="results-title">Converted Times:</h2>';

    // Epoch Time
    results += `
        <div class="time-segment epoch-segment">
            <h3>🕐 EPOCH Time</h3>
            <p><strong>Start:</strong> ${startUTC.getTime()} ms</p>
            <p><strong>End:</strong> ${endUTC.getTime()} ms</p>
            <p><strong>Duration:</strong> ${(endUTC.getTime() - startUTC.getTime()) / 1000} seconds</p>
        </div>`;

    for (let [label, zone] of Object.entries(timeZones)) {
        const startZoned = dateFnsTz.utcToZonedTime(startUTC, zone);
        const endZoned = dateFnsTz.utcToZonedTime(endUTC, zone);

        const formatStr = "yyyy-MM-dd hh:mm:ss a";
        const startFormatted = dateFnsTz.format(startZoned, formatStr, { timeZone: zone });
        const endFormatted = dateFnsTz.format(endZoned, formatStr, { timeZone: zone });

        results += `
            <div class="time-segment">
                <h3>${label} (${zone})</h3>
                <p><strong>Start:</strong> ${startFormatted}</p>
                <p><strong>End:</strong> ${endFormatted}</p>
            </div>`;
    }

    document.getElementById('results').innerHTML = results;
}
