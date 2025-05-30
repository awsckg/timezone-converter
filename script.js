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

function showError(message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorModal.style.display = 'block';
}

function convertTime() {
    const sourceTime = document.getElementById('sourceTime').value;

    if (!sourceTime) {
        showError('Please select a date and time');
        return;
    }

    const sourceDate = new Date(sourceTime);
    const epochTime = sourceDate.getTime();
    
    let results = `
        <div class="time-segment epoch-segment">
            <h3><i class="fas fa-clock"></i> Epoch Time</h3>
            <p>${epochTime} milliseconds</p>
            <p>${Math.floor(epochTime / 1000)} seconds</p>
        </div>
        <h2 class="results-title">Times Across Zones</h2>
        <div class="time-differences">
    `;

    Object.entries(timeZones).forEach(([zone, timeZone]) => {
        try {
            const options = {
                timeZone: timeZone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };

            const convertedTime = sourceDate.toLocaleString('en-US', options);

            results += `
                <div class="time-segment">
                    <h3><i class="fas fa-globe"></i> ${zone}</h3>
                    <p><i class="far fa-clock"></i> ${convertedTime}</p>
                </div>
            `;
        } catch (error) {
            console.error(`Error converting to ${zone}:`, error);
            showError(`Error converting time for ${zone}`);
        }
    });

    results += '</div>';

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results;
    resultsDiv.classList.remove('results-hidden');
    resultsDiv.style.opacity = 1;
}

// Close modal functionality
document.querySelector('.close-modal')?.addEventListener('click', function() {
    document.getElementById('errorModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('errorModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize loading state
document.addEventListener('DOMContentLoaded', function() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.add('results-hidden');
});
