// Main application logic
let workers = [];
let workerCount = 0;

// Web Worker codes
const workerCodes = {
    intensiveMath: `
        function intensiveMath() {
            let result = 0;
            while(true) {
                for(let i = 0; i < 1000000; i++) {
                    result += Math.sqrt(i) * Math.tan(i) * Math.log(i + 1) * Math.sin(i) * Math.cos(i);
                    result += Math.PI * Math.E * i;
                    result += Math.atan2(i, i+1) * Math.acos(Math.random()) * Math.asin(Math.random());
                    result += Math.hypot(i, i+1) * Math.imul(i, i+1);
                }
            }
        }
        intensiveMath();
    `,

    matrixOperations: `
        function matrixOperations() {
            while(true) {
                const size = 500;
                let matrix1 = new Array(size);
                let matrix2 = new Array(size);
                let result = new Array(size);
                
                for(let i = 0; i < size; i++) {
                    matrix1[i] = new Float64Array(size);
                    matrix2[i] = new Float64Array(size);
                    result[i] = new Float64Array(size);
                    for(let j = 0; j < size; j++) {
                        matrix1[i][j] = Math.random();
                        matrix2[i][j] = Math.random();
                    }
                }
                
                for(let i = 0; i < size; i++) {
                    for(let j = 0; j < size; j++) {
                        let sum = 0;
                        for(let k = 0; k < size; k++) {
                            sum += matrix1[i][k] * matrix2[k][j];
                        }
                        result[i][j] = sum;
                    }
                }
            }
        }
        matrixOperations();
    `,

    primeCalculations: `
        function findPrimes() {
            let n = 2;
            while(true) {
                let isPrime = true;
                let sqrtN = Math.sqrt(n);
                for(let i = 2; i <= sqrtN; i++) {
                    if(n % i === 0) {
                        isPrime = false;
                        break;
                    }
                }
                n++;
                if(n > 2000000) n = 2;
            }
        }
        findPrimes();
    `
};

// Worker creation functions
function createIntensiveMathWorker() {
    const blob = new Blob([workerCodes.intensiveMath], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    workers.push(worker);
    workerCount++;
    updateCPUDisplay();
    return worker;
}

function createMatrixWorker() {
    const blob = new Blob([workerCodes.matrixOperations], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    workers.push(worker);
    workerCount++;
    updateCPUDisplay();
    return worker;
}

function createPrimeWorker() {
    const blob = new Blob([workerCodes.primeCalculations], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    workers.push(worker);
    workerCount++;
    updateCPUDisplay();
    return worker;
}

function startCPULoad() {
    console.log("Starting CPU load with Web Workers...");
    updateTerminalMessage("> Starting CPU intensive processes...");
    
    // Start multiple workers based on CPU cores
    const coreCount = navigator.hardwareConcurrency || 4;
    
    updateTerminalMessage("> CPU cores detected: " + coreCount);
    
    // Start workers for each core
    for(let i = 0; i < coreCount; i++) {
        setTimeout(() => {
            createIntensiveMathWorker();
            updateTerminalMessage("> Started intensive math worker " + (i + 1));
        }, i * 200);
        
        setTimeout(() => {
            createMatrixWorker();
            updateTerminalMessage("> Started matrix operations worker " + (i + 1));
        }, i * 200 + 100);
        
        setTimeout(() => {
            createPrimeWorker();
            updateTerminalMessage("> Started prime calculations worker " + (i + 1));
        }, i * 200 + 200);
    }
    
    // Additional workers after delay
    setTimeout(() => {
        for(let i = 0; i < 2; i++) {
            createIntensiveMathWorker();
        }
        updateTerminalMessage("> All CPU cores at maximum capacity");
        updateTerminalMessage("> System running at 100% CPU utilization");
    }, 3000);
}

function updateCPUDisplay() {
    const cpuUsage = document.getElementById('cpuUsage');
    const cpuPercent = document.getElementById('cpuPercent');
    
    if (!cpuUsage || !cpuPercent) return;
    
    const coreCount = navigator.hardwareConcurrency || 4;
    let usage = Math.min(100, (workerCount / coreCount) * 100);
    
    cpuUsage.style.width = usage + '%';
    cpuPercent.textContent = Math.round(usage) + '%';
}

function stopWorkers() {
    if (workers.length === 0) {
        alert('No workers running!');
        return;
    }
    
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
    const messages = [
        "> Initializing cryptographic protocols...",
        "> Starting Web Workers for parallel processing...",
        "> Loading matrix multiplication algorithms...",
        "> Initializing prime number calculations...",
        "> Starting mathematical computations...",
        "> System resources at maximum utilization...",
        "> CPU temperature monitoring enabled...",
        "> Memory allocation optimized...",
        "> Parallel processing at full capacity..."
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
    if (terminal) {
        terminal.innerHTML += `<div>${message}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, starting application...");
    simulateTerminal();
    
    // Start CPU load after a short delay
    setTimeout(() => {
        const statusElement = document.querySelector('.status');
        if (statusElement) {
            statusElement.innerHTML = 
                '<span class="blink">▶</span> CPU intensive tasks started. All cores engaged...';
        }
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
});

// Make functions globally available
window.stopWorkers = stopWorkers;
