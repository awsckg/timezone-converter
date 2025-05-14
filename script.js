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
    
    // Add EPOCH time segment first
    results += `
        <div class="time-segment epoch-segment">
            <h3>EPOCH Time</h3>
            <p>Start: ${startIST.getTime()} ms</p>
            <p>End: ${endIST.getTime()} ms</p>
            <p>Duration: ${endIST.getTime() - startIST.getTime()} ms</p>
        </div>`;

    // Add segments for each timezone
    for (let [zone, region] of Object.entries(timeZones)) {
        const convertedStartTime = startIST.toLocaleString('en-US', {
            timeZone: region,
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const convertedEndTime = endIST.toLocaleString('en-US', {
            timeZone: region,
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        results += `
            <div class="time-segment">
                <h3>${zone}</h3>
                <p>Start: ${convertedStartTime}</p>
                <p>End: ${convertedEndTime}</p>
            </div>`;
    }
    
    document.getElementById('results').innerHTML = results;
}
