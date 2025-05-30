// Add this at the beginning of your script.js
function addTimezoneDropdowns() {
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

    const fromDropdown = document.getElementById('fromTimezone');
    const toDropdown = document.getElementById('toTimezone');

    for (let [zone, region] of Object.entries(timeZones)) {
        fromDropdown.innerHTML += `<option value="${region}">${zone}</option>`;
        toDropdown.innerHTML += `<option value="${region}">${zone}</option>`;
    }
}

// Modified convertTime function
function convertTime() {
    // Input validation
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const fromTimezone = document.getElementById('fromTimezone').value;
    const toTimezone = document.getElementById('toTimezone').value;
    
    if (!startTime || !endTime) {
        alert('Please select both start and end times');
        return;
    }
    
    // Create dates in the selected source timezone
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    if (endDate < startDate) {
        alert('End time cannot be earlier than start time');
        return;
    }

    let results = '<h2 class="results-title">Converted Times:</h2>';
    
    // Add EPOCH time segment
    results += `
        <div class="time-segment epoch-segment">
            <h3><i class="fas fa-clock"></i> EPOCH Time</h3>
            <p><strong>Start:</strong> ${startDate.getTime()} ms</p>
            <p><strong>End:</strong> ${endDate.getTime()} ms</p>
            <p><strong>Duration:</strong> ${endDate.getTime() - startDate.getTime()} ms</p>
        </div>`;

    try {
        const options = {
            timeZone: toTimezone,
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const convertedStartTime = startDate.toLocaleString('en-US', options);
        const convertedEndTime = endDate.toLocaleString('en-US', options);

        results += `
            <div class="time-segment">
                <h3><i class="fas fa-globe"></i> Converted Time</h3>
                <p><strong>Start:</strong> ${convertedStartTime}</p>
                <p><strong>End:</strong> ${convertedEndTime}</p>
            </div>`;
    } catch (error) {
        console.error('Error converting time:', error);
        results += `
            <div class="time-segment error">
                <h3>Error</h3>
                <p>Error converting time for this timezone</p>
            </div>`;
    }
    
    // Display results with animation
    const resultsElement = document.getElementById('results');
    resultsElement.style.opacity = '0';
    resultsElement.innerHTML = results;
    setTimeout(() => {
        resultsElement.style.opacity = '1';
    }, 100);
}
