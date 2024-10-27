const steps = [
    {
        title: "TRANSPORT",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
        field: "milesDriven",
        label: "Miles driven per week",
        max: 1000
    },
    {
        title: "ENERGY",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>',
        field: "electricityUsage",
        label: "Monthly electricity (kWh)",
        max: 1500
    },
    {
        title: "LIFESTYLE",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        field: "meatConsumption",
        label: "Weekly meat consumption (kg)",
        max: 10
    }
];

let currentStep = 0;
const formData = {
    milesDriven: 0,
    electricityUsage: 0,
    meatConsumption: 0
};

// DOM elements
const stepContent = document.querySelector('.step-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const calculatorForm = document.getElementById('calculator-form');
const results = document.getElementById('results');
const totalCarbon = document.getElementById('total-carbon');
const recalculateBtn = document.getElementById('recalculate-btn');

function renderStep() {
    const step = steps[currentStep];
    stepContent.innerHTML = `
        <div class="step-header">
            ${step.icon}
            <h2 class="step-title">${step.title}</h2>
        </div>
        <div class="input-group">
            <label class="input-label">${step.label}</label>
            <input type="range" min="0" max="${step.max}" value="${formData[step.field]}" 
                   oninput="updateValue('${step.field}', this.value)">
            <div class="value-display">${formData[step.field]}</div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${((currentStep + 1) / steps.length) * 100}%"></div>
        </div>
    `;

    prevBtn.disabled = currentStep === 0;
    nextBtn.textContent = currentStep === steps.length - 1 ? 'Calculate' : 'Next';
    progressFill.style.width = ((currentStep + 1) / steps.length) * 100;
}

function updateValue(field, value) {
    formData[field] = Number(value);
    document.querySelector('.value-display').textContent = value;
}

function calculateFootprint() {
    return (
        formData.milesDriven * 0.404 +
        formData.electricityUsage * 0.92 +
        formData.meatConsumption * 6.61
    ).toFixed(1);
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    } else {
        calculatorForm.style.display = 'none';
        results.classList.add('active');
        totalCarbon.textContent = calculateFootprint();
    }
});

recalculateBtn.addEventListener('click', () => {
    currentStep = 0;
    Object.keys(formData).forEach(key => formData[key] = 0);
    calculatorForm.style.display = 'block';
    results.classList.remove('active');
    renderStep();
});

// Initial render
renderStep();
