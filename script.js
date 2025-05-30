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

function convertTime() {
    const sourceTimezone = document.getElementById('sourceTimezone').value;
    const targetTimezones = Array.from(document.getElementById('targetTimezones').selectedOptions)
        .map(option => option.value);
    const sourceTime = document.getElementById('sourceTime').value;

    if (!sourceTime) {
        alert('Please select a time to convert');
        return;
    }

    if (targetTimezones.length === 0) {
        alert('Please select at least one target timezone');
        return;
    }

    const sourceDate = new Date(sourceTime);
    let results = '<h2>Converted Times:</h2>';

    targetTimezones.forEach(targetZone => {
        try {
            const options = {
                timeZone: timeZones[targetZone],
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };

            const convertedTime = new Date(sourceDate.toLocaleString('en-US', {
                timeZone: timeZones[sourceTimezone]
            })).toLocaleString('en-US', options);

            results += `
                <div class="time-result">
                    <h3>${targetZone}</h3>
                    <p>${convertedTime}</p>
                </div>
            `;
        } catch (error) {
            console.error(`Error converting to ${targetZone}:`, error);
        }
    });

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results;
    resultsDiv.style.opacity = 1;
}
