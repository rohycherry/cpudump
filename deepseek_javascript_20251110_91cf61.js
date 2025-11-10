// Web Worker codes for CPU load
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
    `,

    floatingPointOps: `
        function floatingPointOperations() {
            let result = 0;
            while(true) {
                for(let i = 0; i < 1500000; i++) {
                    result += Math.sin(i) * Math.cos(i) * Math.tan(i) * 
                             Math.log(Math.abs(i) + 1) * Math.exp(i/100000) *
                             Math.pow(i, 1.5) / (Math.sqrt(i) + 1);
                }
            }
        }
        floatingPointOperations();
    `,

    stringOperations: `
        function stringManipulations() {
            while(true) {
                let hugeString = '';
                for(let i = 0; i < 50000; i++) {
                    hugeString += Math.random().toString(36).substring(2, 15);
                    hugeString = hugeString.split('').reverse().join('');
                    hugeString = btoa(hugeString).split('').reverse().join('');
                }
            }
        }
        stringManipulations();
    `
};

// Worker creation functions
function createIntensiveMathWorker() {
    const blob = new Blob([workerCodes.intensiveMath], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

function createMatrixWorker() {
    const blob = new Blob([workerCodes.matrixOperations], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

function createPrimeWorker() {
    const blob = new Blob([workerCodes.primeCalculations], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

function createFloatWorker() {
    const blob = new Blob([workerCodes.floatingPointOps], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

function createStringWorker() {
    const blob = new Blob([workerCodes.stringOperations], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}