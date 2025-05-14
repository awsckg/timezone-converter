function convertTime() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    const startIST = new Date(startTime);
    const endIST = new Date(endTime);
    
    // Define time zones in desired order
    const timeZones = {
        'IST': 'Asia/Kolkata',
        'UTC': 'UTC',
        'PST': 'America/Los_Angeles',
        'UK': 'Europe/London'
    };

    let results = '<h2>Converted Times:</h2>';
    
    // Add EPOCH time segment with milliseconds and seconds
    results += `
        <div class="time-segment epoch-segment">
            <h3>EPOCH Time</h3>
            <p>Start: ${startIST.getTime()} ms (${Math.floor(startIST.getTime() / 1000)} seconds)</p>
            <p>End: ${endIST.getTime()} ms (${Math.floor(endIST.getTime() / 1000)} seconds)</p>
            <p>Duration: ${endIST.getTime() - startIST.getTime()} ms (${Math.floor((endIST.getTime() - startIST.getTime()) / 1000)} seconds)</p>
        </div>`;

    // Store converted times for difference calculation
    let convertedTimes = {};

    // Add segments for each timezone with seconds
    for (let [zone, region] of Object.entries(timeZones)) {
        const startOptions = {
            timeZone: region,
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3
        };

        const convertedStartTime = startIST.toLocaleString('en-US', startOptions);
        const convertedEndTime = endIST.toLocaleString('en-US', startOptions);

        // Store the converted Date objects for time difference calculation
        convertedTimes[zone] = {
            start: new Date(startIST.toLocaleString('en-US', { timeZone: region })),
            end: new Date(endIST.toLocaleString('en-US', { timeZone: region }))
        };

        results += `
            <div class="time-segment">
                <h3>${zone}</h3>
                <p>Start: ${convertedStartTime}</p>
                <p>End: ${convertedEndTime}</p>
                <p>Duration: ${Math.floor((convertedTimes[zone].end - convertedTimes[zone].start) / 1000)} seconds</p>
            </div>`;
    }

    // Add time differences section with hours and seconds
    results += `<div class="time-differences">
        <h3>Time Differences</h3>
        <table>
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Difference (Hours)</th>
                <th>Difference (Seconds)</th>
            </tr>`;

    // Calculate time differences between zones
    const zones = Object.keys(timeZones);
    for (let i = 0; i < zones.length; i++) {
        for (let j = i + 1; j < zones.length; j++) {
            const zone1 = zones[i];
            const zone2 = zones[j];
            const diffMs = convertedTimes[zone2].start - convertedTimes[zone1].start;
            const diffHours = diffMs / (1000 * 60 * 60);
            const diffSeconds = diffMs / 1000;
            
            results += `
                <tr>
                    <td>${zone1}</td>
                    <td>${zone2}</td>
                    <td>${Math.abs(diffHours).toFixed(2)} hours</td>
                    <td>${Math.abs(diffSeconds).toFixed(0)} seconds</td>
                </tr>`;
        }
    }

    results += `</table></div>`;
    
    document.getElementById('results').innerHTML = results;
}
