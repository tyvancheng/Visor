
export default class MonthlyData {
    constructor(symbol,firstSearch) {
        this.firstSearch = firstSearch
        this.plotStockGraph(symbol)
        this.stockData = null
    }
// Fetch data from Alpha Vantage API for the past year
fetchStockData = async (symbol) => {

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=EMX9C3VLWA4KWGK1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Extract data for the past year
    const timeSeriesData = data['Weekly Time Series'];
    this.stockData = timeSeriesData

    this.parseGraphData(this.stockData)
    // timestamps = timestamps.map(date => {
    //     return date.split("-")
    // })
    // console.log(timestamps)

  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

parseGraphData = (timeSeriesData) => {
    let timestamps = Object.keys(timeSeriesData).slice(0, 52).reverse(); // Get the first 12 timestamps (past year)
    const stockPrices = timestamps.map((timestamp) => parseFloat(timeSeriesData[timestamp]['4. close']));
    return {timestamps,stockPrices};
}

// Plot stock data on a graph
plotStockGraph = async (symbol) => {
//   const stockData = await this.fetchStockData(symbol);
//   if (stockData) {
   
    const canvas = document.getElementById('stock-chart')
    const ctx = canvas.getContext('2d');

    
    if (canvas.chart) {
        canvas.chart.destroy();
        delete canvas.chart; // Remove the chart property
      }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockData.timestamps,
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: stockData.stockPrices,
            borderColor: 'black',
            backgroundColor: 'white',
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
    canvas.chart = chart;
//   }
};

fetchAndPlotStockGraph = async (symbol) => {
    if (!this.stockData) {
      // Fetch stock data if not already fetched
      this.stockData = await this.fetchStockData(symbol);
    }

    // Plot stock graph using the fetched data
    if (this.stockData) {
      this.plotStockGraph();
    }
  };

}
