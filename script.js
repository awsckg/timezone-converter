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
        
        const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
        document.getElementById('london-time').textContent = londonTime.toLocaleString('en-US', options);
        
        const newYorkTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        document.getElementById('newyork-time').textContent = newYorkTime.toLocaleString('en-US', options);
        
        const tokyoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
        document.getElementById('tokyo-time').textContent = tokyoTime.toLocaleString('en-US', options);
        
        const mumbaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        document.getElementById('mumbai-time').textContent = mumbaiTime.toLocaleString('en-US', options);

        const sydneyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
        document.getElementById('sydney-time').textContent = sydneyTime.toLocaleString('en-US', options);

        const singaporeTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
        document.getElementById('singapore-time').textContent = singaporeTime.toLocaleString('en-US', options);
    }

    setInterval(updateWorldClocks, 1000);
    updateWorldClocks();

    // Time Zone Converter Function
    function convertTime() {
        const startTimeInput = document.getElementById('startTime').value;
        const endTimeInput = document.getElementById('endTime').value;
        const inputTimeZone = document.getElementById('inputTimeZone').value;
        const resultsDiv = document.getElementById('results');

        if (!startTimeInput || !endTimeInput) {
            alert('Please select both start and end times');
            return;
        }

        // Create Date objects from the inputs
        const startUTC = new Date(startTimeInput);
        const endUTC = new Date(endTimeInput);

        if (endUTC < startUTC) {
            alert('End time cannot be earlier than start time');
            return;
        }

        const timeZones = {
            IST: 'Asia/Kolkata',
            UTC: 'UTC',
            PST: 'America/Los_Angeles',
            UK: 'Europe/London',
            AEST: 'Australia/Sydney',
            SGT: 'Asia/Singapore',
            CET: 'Europe/Paris',
            EET: 'Europe/Helsinki',
            WET: 'Europe/Lisbon',
        };

        let html = `<h2 class="results-title">Converted Times:</h2>`;

        // Add EPOCH time segment
        html += `
            <div class="time-segment epoch-segment">
                <h3>⏱️ EPOCH Time (milliseconds since Jan 1, 1970 UTC)</h3>
                <p><strong>Start:</strong> ${startUTC.getTime()} ms</p>
                <p><strong>End:</strong> ${endUTC.getTime()} ms</p>
                <p><strong>Duration:</strong> ${endUTC.getTime() - startUTC.getTime()} ms</p>
            </div>
        `;

        // Convert for each timezone
        for (const [zoneAbbr, tzName] of Object.entries(timeZones)) {
            const startStr = startUTC.toLocaleString('en-US', {
                timeZone: tzName,
                hour12: true,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            const endStr = endUTC.toLocaleString('en-US', {
                timeZone: tzName,
                hour12: true,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            const durationMs = endUTC - startUTC;
            const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
            const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

            html += `
                <div class="time-segment">
                    <h3>${zoneAbbr} (${tzName})</h3>
                    <p><strong>Start:</strong> ${startStr}</p>
                    <p><strong>End:</strong> ${endStr}</p>
                    <p><strong>Duration:</strong> ${durationHours}h ${durationMinutes}m</p>
                </div>
            `;
        }

        resultsDiv.innerHTML = html;
    }
</script>
