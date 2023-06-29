// Assuming you have arrays of historical stock returns and benchmark returns
const stockReturns = [/* stock returns array */];
const benchmarkReturns = [/* benchmark returns array */];

// Function to calculate the beta coefficient
export const calculateBeta = (stockReturns, benchmarkReturns) => {
    debugger
    const returnOrganizer = (returns) => {
        return Object.values(returns).map(day => parseInt(Object.values(day)[3])
    }
   
    stockReturns = returnOrganizer(stockReturns)
    benchmarkReturns = returnOrganizer(benchmarkReturns)
    
    // Adjust the array lengths to make them equal
    const maxLength = Math.max(stockReturns.length, benchmarkReturns.length);
        if (stockReturns.length < maxLength) {
            const diff = maxLength - stockReturns.length;
            stockReturns = stockReturns.concat(stockReturns.slice(-diff));
        } else if (benchmarkReturns.length < maxLength) {
            const diff = maxLength - benchmarkReturns.length;
            benchmarkReturns = benchmarkReturns.concat(benchmarkReturns.slice(-diff));
        }

    // Calculate the average returns
    debugger
    const sumReducer = (x) => {
      return x.reduce((sum, ret) => parseInt(sum) + parseInt(ret), 0) / x.length;
    }
    const stockAvgReturn = sumReducer(stockReturns)
    const benchmarkAvgReturn = sumReducer(benchmarkReturns)
debugger
    // Calculate the covariance between stock and benchmark returns
    let covariance = 0;
    for (let i = 0; i < stockReturns.length; i++) {
        covariance += (stockReturns[i] - stockAvgReturn) * (benchmarkReturns[i] - benchmarkAvgReturn);
    }
    covariance /= stockReturns.length;
    debugger

    // Calculate the variance of the benchmark returns
    let benchmarkVariance = 0;
    for (let i = 0; i < benchmarkReturns.length; i++) {
        benchmarkVariance += Math.pow(benchmarkReturns[i] - benchmarkAvgReturn, 2);
    }
    benchmarkVariance /= benchmarkReturns.length;

    // Calculate the beta coefficient
    const beta = covariance / benchmarkVariance;
    debugger
    return `Beta: ${beta}`;
};

