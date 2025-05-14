function convertTime() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    
    if (!startTime || !endTime) {
        alert('Please select both start and end times');
        return;
    }

    try {
        // Create Date objects and adjust for IST (UTC+5:30)
        const startIST = new Date(startTime);
        const endIST = new Date(endTime);
        
        if (isNaN(startIST.getTime()) || isNaN(endIST.getTime())) {
            alert('Invalid date format');
            return;
        }

        const timeZones = {
            'IST': 'Asia/Kolkata',
            'UTC': 'UTC',
            'PST': 'America/Los_Angeles',
            'UK': 'Europe/London'
        };

        let results = '<h2>Converted Times:</h2>';
        
        // Add EPOCH time segment
        results += `
            <div class="time-segment epoch-segment">
                <h3>EPOCH Time</h3>
                <p>Start: ${startIST.getTime()} ms</p>
                <p>End: ${endIST.getTime()} ms</p>
                <p>Duration: ${endIST.getTime() - startIST.getTime()} ms</p>
            </div>`;

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

                const convertedStartTime = new Intl.DateTimeFormat('en-US', startOptions).format(startIST);
                const convertedEndTime = new Intl.DateTimeFormat('en-US', startOptions).format(endIST);

                // Calculate duration in seconds
                const durationInSeconds = (endIST - startIST) / 1000;

                // Store the converted times
                convertedTimes[zone] = {
                    start: startIST,
                    end: endIST
                };

                results += `
                    <div class="time-segment">
                        <h3>${zone}</h3>
                        <p>Start: ${convertedStartTime}</p>
                        <p>End: ${convertedEndTime}</p>
                        <p>Duration: ${durationInSeconds.toFixed(2)} seconds</p>
                    </div>`;
            } catch (e) {
                console.error(`Error converting time for ${zone}:`, e);
            }
        }

        // Add time differences table
        results += `<div class="time-differences">
            <h3>Time Differences (in hours)</h3>
            <table>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Difference</th>
                </tr>`;

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

        results += `</table></div>`;
        
        document.getElementById('results').innerHTML = results;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while converting the times');
    }
}
