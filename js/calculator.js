// Solar Calculator Logic
function calculateSolar() {
    // Get input values
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 0;
    const roofArea = parseFloat(document.getElementById('roofArea').value) || 0;
    const sunHours = parseFloat(document.getElementById('sunHours').value) || 6;
    const tariffRate = parseFloat(document.getElementById('tariffRate').value) || 35;
    const propertyType = document.getElementById('propertyType').value;

    // Constants
    const panelWattage = 550; // Standard panel size
    const panelArea = 22; // sq ft per panel
    const panelCostPerWatt = 80; // PKR per watt installed
    const systemEfficiency = 0.85; // 85% efficiency
    const degradationRate = 0.005; // 0.5% per year
    const co2PerKwh = 0.5; // kg CO2 per kWh

    // Calculate system size
    const dailyConsumption = (monthlyBill / tariffRate) / 30; // kWh per day
    const requiredSystemSize = dailyConsumption / (sunHours * systemEfficiency); // kW
    const systemSize = Math.ceil(requiredSystemSize * 10) / 10; // Round to 1 decimal

    // Calculate panels needed
    const panelCount = Math.ceil((systemSize * 1000) / panelWattage);

    // Check if roof can accommodate panels
    const requiredRoofArea = panelCount * panelArea;
    const roofOK = requiredRoofArea <= roofArea;

    // Calculate savings
    const monthlyGeneration = systemSize * sunHours * 30 * systemEfficiency; // kWh
    const monthlySavings = monthlyGeneration * tariffRate;
    const annualSavings = monthlySavings * 12;

    // 25-year savings with degradation
    let totalSavings25 = 0;
    for (let year = 0; year < 25; year++) {
        const yearlyDegradation = Math.pow(1 - degradationRate, year);
        totalSavings25 += annualSavings * yearlyDegradation;
    }

    // System cost
    const systemCost = systemSize * 1000 * panelCostPerWatt;

    // Payback period
    const paybackYears = systemCost / annualSavings;

    // CO2 reduction
    const annualCO2Reduction = monthlyGeneration * 12 * co2PerKwh;

    // Update results
    document.getElementById('systemSize').textContent = systemSize + ' kW';
    document.getElementById('panelCount').textContent = panelCount + ' panels';
    document.getElementById('monthlySavings').textContent = 'PKR ' + formatNumber(Math.round(monthlySavings));
    document.getElementById('annualSavings').textContent = 'PKR ' + formatNumber(Math.round(annualSavings));
    document.getElementById('totalSavings').textContent = 'PKR ' + formatNumber(Math.round(totalSavings25));
    document.getElementById('systemCost').textContent = 'PKR ' + formatNumber(Math.round(systemCost));
    document.getElementById('paybackPeriod').textContent = paybackYears.toFixed(1) + ' years';
    document.getElementById('co2Reduction').textContent = Math.round(annualCO2Reduction) + ' tons';

    // Add animation to results
    document.querySelectorAll('.result-value').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = 'resultPop 0.3s ease';
    });
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Add result animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes resultPop {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Auto-calculate on page load
window.addEventListener('load', () => {
    setTimeout(calculateSolar, 1600);
});

// Recalculate on any input change
document.querySelectorAll('#monthlyBill, #roofArea, #sunHours, #tariffRate, #propertyType').forEach(input => {
    input.addEventListener('change', calculateSolar);
});
