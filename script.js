function convertTime() {
    const timezone = document.getElementById('timezone').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (!startTime || !endTime) {
        alert('Please select both start and end times');
        return;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const convertedStart = startDate.toLocaleString('en-US', options);
    const convertedEnd = endDate.toLocaleString('en-US', options);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2 class="results-title">Converted Times</h2>
        <div class="time-segment">
            <h3>Selected Timezone: ${timezone}</h3>
            <p>Start Time: ${convertedStart}</p>
            <p>End Time: ${convertedEnd}</p>
        </div>
    `;
}

// Initialize the timezone dropdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    const timezone = document.getElementById('timezone');
    // Set default timezone if needed
    timezone.value = 'UTC';
});
