<script>
    // World Clock Update Function
    function updateWorldClocks() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        const timeZones = {
            'london-time': 'Europe/London',
            'newyork-time': 'America/New_York',
            'tokyo-time': 'Asia/Tokyo',
            'mumbai-time': 'Asia/Kolkata',
            'sydney-time': 'Australia/Sydney',
            'singapore-time': 'Asia/Singapore'
        };

        for (const [elementId, timezone] of Object.entries(timeZones)) {
            const time = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            document.getElementById(elementId).textContent = time.toLocaleString('en-US', options);
        }
    }

    // Update clocks every second
    setInterval(updateWorldClocks, 1000);
    updateWorldClocks();

    // Time Zone Converter Function
    function convertTime() {
    // Get input values
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const selectedZone = document.getElementById('inputTimeZone').value;

    // Validate inputs
    if (!startTime || !endTime) {
        alert('Please select both start and end times');
        return;
    }

    // Create date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end < start) {
        alert('End time cannot be earlier than start time');
        return;
    }

    // Define all time zones
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

    // Calculate duration
    const duration = end - start;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    // Start building output HTML
    let outputHtml = `
        <div class="time-segment">
            <h3>Duration</h3>
            <p><strong>Total Duration:</strong> ${hours}h ${minutes}m</p>
        </div>
    `;

    // Add conversions for each time zone
    for (const [zoneName, zoneValue] of Object.entries(timeZones)) {
        const startOptions = {
            timeZone: zoneValue,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        const endOptions = { ...startOptions };

        const startInZone = start.toLocaleString('en-US', startOptions);
        const endInZone = end.toLocaleString('en-US', endOptions);

        outputHtml += `
            <div class="time-segment">
                <h3>${zoneName} (${zoneValue})</h3>
                <p><strong>Start:</strong> ${startInZone}</p>
                <p><strong>End:</strong> ${endInZone}</p>
            </div>
        `;
    }

    // Display results
    document.getElementById('results').innerHTML = outputHtml;
}

        // Calculate duration
        const duration = end - start;
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

        // Generate output HTML
        const outputHtml = `
            <div class="time-segment">
                <h3>Converted Times</h3>
                <p><strong>Time Zone:</strong> ${selectedZone}</p>
                <p><strong>Start:</strong> ${start.toLocaleString()}</p>
                <p><strong>End:</strong> ${end.toLocaleString()}</p>
                <p><strong>Duration:</strong> ${hours}h ${minutes}m</p>
            </div>
        `;

        // Display results
        document.getElementById('results').innerHTML = outputHtml;
    }
</script>
