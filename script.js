function convertTime() {
    const istTime = document.getElementById('istTime').value;
    const ist = new Date(istTime);
    
    // Define time zones in desired order
    const timeZones = {
        'IST': 'Asia/Kolkata',
        'PST': 'America/Los_Angeles',
        'UK': 'Europe/London'
    };

    let results = '<h2>Converted Times:</h2>';
    
    // Add segments for each timezone
    for (let [zone, region] of Object.entries(timeZones)) {
        const convertedTime = ist.toLocaleString('en-US', {
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
                <p>${convertedTime}</p>
            </div>`;
    }
    
    // Add EPOCH time segment
    const epochTime = ist.getTime();
    results += `
        <div class="time-segment">
            <h3>EPOCH</h3>
            <p>${epochTime}</p>
        </div>`;
    
    document.getElementById('results').innerHTML = results;
}
