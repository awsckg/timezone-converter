function convertTime() {
    // Input validation
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    if (!startTime || !endTime) {
        alert('Please select both start and end times');
        return;
    }
    
    const startIST = new Date(startTime);
    const endIST = new Date(endTime);
    
    if (endIST < startIST) {
        alert('End time cannot be earlier than start time');
        return;
    }
    
    // Define time zones in desired order
    const timeZones = {
        'IST': 'Asia/Kolkata',
        'UTC': 'UTC',
        'PST': 'America/Los_Angeles',
        'UK': 'Europe/London',
        'AEST': 'Australia/Sydney',
        'SGT': 'Asia/Singapore',  // Fixed missing comma
        'CET': 'Europe/Paris',    
        'EET': 'Europe/Helsinki', 
        'WET': 'Europe/Lisbon'    
    };

    let results = '<h2 class="results-title">Converted Times:</h2>';
    
    // Add EPOCH time segment first
    results += `
        <div class="time-segment epoch-segment">
            <h3><i class="fas fa-clock"></i> EPOCH Time</h3>
            <p><strong>Start:</strong> ${startIST.getTime()} ms</p>
            <p><strong>End:</strong> ${endIST.getTime()} ms</p>
            <p><strong>Duration:</strong> ${endIST.getTime() - startIST.getTime()} ms</p>
        </div>`;

    // Store converted times for difference calculation
    let convertedTimes = {};

    // Add segments for each timezone
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
                second: '2-digit'
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
                    <h3><i class="fas fa-globe"></i> ${zone}</h3>
                    <p><strong>Start:</strong> ${convertedStartTime}</p>
                    <p><strong>End:</strong> ${convertedEndTime}</p>
                </div>`;
        } catch (error) {
            console.error(`Error converting time for ${zone}:`, error);
            results += `
                <div class="time-segment error">
                    <h3>${zone}</h3>
                    <p>Error converting time for this timezone</p>
                </div>`;
        }
    }

    // Add time differences section
    results += `<div class="time-differences">
        <h3><i class="fas fa-exchange-alt"></i> Time Differences (in hours)</h3>
        <table>
            <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Difference</th>
                </tr>
            </thead>
            <tbody>`;

    // Calculate time differences between zones
    const zones = Object.keys(timeZones);
    for (let i = 0; i < zones.length; i++) {
        for (let j = i + 1; j < zones.length; j++) {
            const zone1 = zones[i];
            const zone2 = zones[j];
            const diff = (convertedTimes[zone2].start - convertedTimes[zone1].start) / (1000 * 60 * 60);
            
            results += `
                <tr>
                    <td>${zone1}</td>
                    <td>${zone2}</td>
                    <td>${Math.abs(diff).toFixed(2)} hours</td>
                </tr>`;
        }
    }

    results += `</tbody></table></div>`;
    
    // Display results with animation
    const resultsElement = document.getElementById('results');
    resultsElement.style.opacity = '0';
    resultsElement.innerHTML = results;
    setTimeout(() => {
        resultsElement.style.opacity = '1';
    }, 100);
}
