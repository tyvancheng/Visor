// Import Chart.js library
// import Chart from 'chart.js/auto';

export default class MonthlyData {
    constructor(symbol) {
        // this.symbol = symbol
        this.plotStockGraph(symbol)
    }

// Fetch data from Alpha Vantage API for the past year
fetchStockData = async (symbol) => {

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=EMX9C3VLWA4KWGK1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Extract data for the past year
    const timeSeriesData = data['Monthly Time Series'];
    const timestamps = Object.keys(timeSeriesData).slice(0, 12); // Get the first 12 timestamps (past year)
    const stockPrices = timestamps.map((timestamp) => parseFloat(timeSeriesData[timestamp]['4. close']));
    // console.log(timestamps,stockPrices)

    const stockData = {}

    for (let i = 0; i < timestamps.length; i++) {
        stockData[timestamps[i]] = stockPrices[i];
        // console.log(i)
      }
    
    return stockData;
    // console.log(stockData)

  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

// Plot stock data on a graph
plotStockGraph = async (symbol) => {
  const stockData = await this.fetchStockData(symbol);
   
  if (stockData) {
    const ctx = document.getElementById('stock-chart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockData.timestamps,
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: stockData.stockPrices,
            borderColor: 'blue',
            backgroundColor: 'transparent',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Timestamp',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Stock Price',
            },
          },
        },
      },
    });
  }
};

// Call the function to plot the graph for a specific stock symbol

}
