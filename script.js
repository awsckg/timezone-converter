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
        try {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = new Intl.DateTimeFormat('en-US', {
                    ...options,
                    timeZone: timezone
                }).format(now);
            }
        } catch (error) {
            console.error(`Error updating clock for ${timezone}: ${error}`);
        }
    }
}

// Start the clock updates
updateWorldClocks(); // Initial update
setInterval(updateWorldClocks, 1000); // Update every second

// Time Zone Converter Function
function convertTime() {
    console.log('Convert button clicked');
    
    // Get input values
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    console.log('Start time:', startTime);
    console.log('End time:', endTime);
    
    // Rest of the function...
}
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

    // Define time zones for conversion
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

    let outputHtml = `
        <div class="time-segment">
            <h3>Duration</h3>
            <p><strong>Total Duration:</strong> ${hours}h ${minutes}m</p>
        </div>
    `;

    // Convert times for each time zone
    for (const [zoneName, zoneValue] of Object.entries(timeZones)) {
        try {
            const options = {
                timeZone: zoneValue,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };

            const startInZone = start.toLocaleString('en-US', options);
            const endInZone = end.toLocaleString('en-US', options);

            outputHtml += `
                <div class="time-segment">
                    <h3>${zoneName}</h3>
                    <p><strong>Start:</strong> ${startInZone}</p>
                    <p><strong>End:</strong> ${endInZone}</p>
                </div>
            `;
        } catch (error) {
            console.error(`Error converting time for ${zoneName}: ${error}`);
        }
    }

    // Display results
    document.getElementById('results').innerHTML = outputHtml;
}
</script>
