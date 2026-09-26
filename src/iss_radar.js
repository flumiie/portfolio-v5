import './styles/iss_radar.css';

const issDashboard = document.querySelector("#iss-dashboard");

const fetchISSData = async () => {
    try {
        const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        const data = await response.json();

        // Interface
        issDashboard.innerHTML = `
      <div class="iss-status-header">[ LIVE ORBITAL TELEMETRY ]</div>
      <div class="data-row">
        <span class="data-label">LATITUDE</span>
        <span class="data-value">${data.latitude.toFixed(4)}°</span>
      </div>
      <div class="data-row">
        <span class="data-label">LONGITUDE</span>
        <span class="data-value">${data.longitude.toFixed(4)}°</span>
      </div>
      <div class="data-row">
        <span class="data-label">ALTITUDE</span>
        <span class="data-value">${data.altitude.toFixed(2)} km</span>
      </div>
      <div class="data-row">
        <span class="data-label">VELOCITY</span>
        <span class="data-value">${data.velocity.toFixed(2)} km/h</span>
      </div>
    `;

    } catch (error) {
        issDashboard.innerHTML = `<p style="color: red; text-align: center;">[ UPLINK FAILED ]</p>`;
    }
};

fetchISSData();
setInterval(fetchISSData, 2000);