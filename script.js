function convertTime() {
    const istTime = document.getElementById('istTime').value;
    const ist = new Date(istTime);
    
    const timeZones = {
        'PST': 'America/Los_Angeles',
        'EST': 'America/New_York',
        'GMT': 'Europe/London',
        'CET': 'Europe/Paris',
        'JST': 'Asia/Tokyo'
    };

    let results = '<h2>Converted Times:</h2>';
    
    for (let [zone, region] of Object.entries(timeZones)) {
        const convertedTime = ist.toLocaleString('en-US', {timeZone: region});
        results += `<p>${zone}: ${convertedTime}</p>`;
    }
    
    document.getElementById('results').innerHTML = results;
}
