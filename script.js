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

function formatDuration(duration) {
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    let durationStr = '';
    if (days > 0) durationStr += `${days} days `;
    if (hours > 0) durationStr += `${hours} hours `;
    if (minutes > 0) durationStr += `${minutes} minutes`;
    
    return durationStr.trim() || '0 minutes';
}

function convertTime() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (!startTime || !endTime) {
        alert('Please select both start and end times');
        return;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    if (endDate < startDate) {
        alert('End time cannot be earlier than start time');
        return;
    }

    const duration = endDate - startDate;
    const formattedDuration = formatDuration(duration);
