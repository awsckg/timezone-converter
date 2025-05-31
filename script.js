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
