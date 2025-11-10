// Main application logic
let workers = [];
let workerCount = 0;

function startCPULoad() {
    console.log("Starting CPU load with Web Workers...");
    
    // Start multiple workers based on CPU cores
    const coreCount = navigator.hardwareConcurrency || 4;
    const totalWorkers = coreCount * 3; // 3 workers per core
    
    for(let i = 0; i < coreCount; i++) {
        addWorker(createIntensiveMathWorker());
        addWorker(createMatrixWorker());
        addWorker(createPrimeWorker());
    }
    
    // Additional workers for maximum load
    setTimeout(() => {
        for(let i = 0; i < 2; i++) {
            addWorker(createFloatWorker());
            addWorker(createStringWorker());
        }
        updateTerminalMessage("> All CPU cores at maximum capacity");
    }, 1500);
    
    updateTerminalMessage(`> Started ${totalWorkers} workers across ${coreCount} CPU cores`);
}

function addWorker(worker) {
    workers.push(worker);
    workerCount++;
    updateCPUDisplay();
}

function updateCPUDisplay() {
    const cpuUsage = document.getElementById('cpuUsage');
    const cpuPercent = document.getElementById('cpuPercent');
    
    // Calculate CPU usage based on worker count and cores
    const coreCount = navigator.hardwareConcurrency || 4;
    let usage = Math.min(100, (workerCount / (coreCount * 2)) * 100);
    
    cpuUsage.style.width = usage + '%';
    cpuPercent.textContent = Math.round(usage) + '%';
}

function stopWorkers() {
    workers.forEach(worker => {
        worker.terminate();
    });
    workers = [];
    workerCount = 0;
    updateCPUDisplay();
    updateTerminalMessage("> EMERGENCY STOP: All processes terminated");
    document.querySelector('.status').innerHTML = 
        '<span style="color:#f00">▶</span> Process stopped by user';
}

function simulateTerminal() {
    const terminal = document.getElementById('terminal');
    const messages = [
        "> Initializing cryptographic protocols...",
        "> Starting Web Workers for parallel processing...",
        "> Loading matrix multiplication algorithms...",
        "> Initializing prime number calculations...",
        "> Starting mathematical computations...",
        "> CPU cores detected: " + (navigator.hardwareConcurrency || "Unknown"),
        "> Launching worker threads for maximum CPU utilization...",
        "> System resources at maximum utilization...",
        "> CPU temperature monitoring enabled...",
        "> Memory allocation optimized...",
        "> Parallel processing at full capacity...",
        "> All CPU cores engaged in computation...",
        "> Computational efficiency at peak levels...",
        "> System stability maintained...",
        "> Continuous processing initiated..."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
        if(index < messages.length) {
            updateTerminalMessage(messages[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

function updateTerminalMessage(message) {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML += `<div>${message}</div>`;
    terminal.scrollTop = terminal.scrollHeight;
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    simulateTerminal();
    
    // Start CPU load after a short delay
    setTimeout(() => {
        document.querySelector('.status').innerHTML = 
            '<span class="blink">▶</span> CPU intensive tasks started. All cores engaged...';
        startCPULoad();
    }, 2000);
});

// Prevent right-click and other context menus
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Prevent keyboard shortcuts for closing
document.addEventListener('keydown', function(e) {
    if(e.ctrlKey && (e.key === 'w' || e.key === 'W' || e.key === 'F4')) {
        e.preventDefault();
        alert('Please wait for the process to complete or use Emergency Stop button.');
    }
    if(e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        alert('Refresh is disabled during system processing.');
    }
    if(e.key === 'Escape') {
        e.preventDefault();
        alert('Use the Emergency Stop button to terminate processes.');
    }
});
