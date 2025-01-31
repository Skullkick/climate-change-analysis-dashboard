// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
});

// Chart Configurations
const chartConfigs = {
  co2: {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "CO2 Levels (ppm)",
        data: [],
        borderColor: "#e74c3c",
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { text: "Year" } },
        y: { title: { text: "CO2 (ppm)" } }
      }
    }
  },
  temperature: {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "#f1c40f",
          fill: false
        },
        {
          label: "Temperature Trend",
          data: [],
          borderColor: "#e67e22",
          borderDash: [5, 5],
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        annotation: {
          annotations: {}
        }
      },
      scales: {
        x: { title: { text: "Year" } },
        y: { title: { text: "Temperature (°C)" } }
      }
    }
  },
  deforestation: {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Forest Area (sq. km)",
        data: [],
        borderColor: "#27ae60",
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { text: "Year" } },
        y: { title: { text: "Area (sq. km)" } }
      }
    }
  },
  seaLevel: {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Sea Level (mm)",
        data: [],
        borderColor: "#3498db",
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: { mode: "index", intersect: false }
      },
      scales: {
        y: {
          title: { display: true, text: "Sea Level (mm)" }
        },
        x: {
          title: { display: true, text: "Year" }
        }
      }
    }
  }
};

// Initialize Charts
const charts = {
  co2: new Chart(document.getElementById("co2Chart"), chartConfigs.co2),
  temperature: new Chart(document.getElementById("temperatureChart"), chartConfigs.temperature),
  deforestation: new Chart(document.getElementById("deforestationChart"), chartConfigs.deforestation),
  seaLevel: new Chart(document.getElementById("seaLevelChart"), chartConfigs.seaLevel)
};

// Calculate Linear Regression (For Temperature Trend)
function calculateTrend(data) {
  const x = data.map((_, i) => i);
  const y = data;
  const n = x.length;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, _, i) => a + x[i] * y[i], 0);
  const sumXX = x.reduce((a, _, i) => a + x[i] * x[i], 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return y.map((_, i) => intercept + slope * i);
}

// Calculate the Mean of an Array
function calculateMean(data) {
  const sum = data.reduce((a, b) => a + b, 0);
  return sum / data.length;
}

// Fetch and Update Data
async function fetchAndUpdateData() {
  try {
    // Fetch CO2 Data
    const co2Response = await fetch("public/data/predictions/prophet_co2_predictions.json");
    const co2Data = await co2Response.json();
    charts.co2.data.labels = co2Data.map(d => d.Date);
    charts.co2.data.datasets[0].data = co2Data.map(d => d.Predicted);
    charts.co2.update();

    // Fetch Temperature Data & Calculate Trend
    const tempResponse = await fetch("public/data/processed/decadal_temperature.json");
    const tempData = await tempResponse.json();
    const temperatures = tempData.map(d => d.Temperature);
    charts.temperature.data.labels = tempData.map(d => d.Decade);
    charts.temperature.data.datasets[0].data = temperatures;
    charts.temperature.data.datasets[1].data = calculateTrend(temperatures);
    charts.temperature.update();

    // Fetch Deforestation Data
    const deforestationResponse = await fetch("public/data/processed/deforestation.json");
    const deforestationData = await deforestationResponse.json();
    charts.deforestation.data.labels = deforestationData.map(d => d.Year);
    charts.deforestation.data.datasets[0].data = deforestationData.map(d => d.Area_Deforested);
    charts.deforestation.update();

    // Fetch Sea Level Data
    const seaLevelResponse = await fetch("public/data/processed/sea_level.json");
    const seaLevelData = await seaLevelResponse.json();
    console.log(seaLevelData); // Check if the data is fetched correctly

    const seaLevels = seaLevelData.map(d => parseFloat(d["Sea Level"])); // Convert Sea Level to number
    console.log(seaLevels); // Check if the Sea Level values are converted correctly

    // Calculate the Mean Sea Level
    const meanSeaLevel = calculateMean(seaLevels);
    console.log("Mean Sea Level:", meanSeaLevel); // Log the mean value

    // Adjust the Sea Level data to be relative to the mean
    const adjustedSeaLevels = seaLevels.map(level => level - meanSeaLevel);
    console.log("Adjusted Sea Levels:", adjustedSeaLevels); // Log the adjusted values

    // Update the Sea Level Chart with the adjusted values
    charts.seaLevel.data.labels = seaLevelData.map(d => d.Date);
    charts.seaLevel.data.datasets[0].data = adjustedSeaLevels;
    charts.seaLevel.update();

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Load Data on Page Load
window.addEventListener("load", fetchAndUpdateData);
