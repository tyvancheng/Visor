
export default class MonthlyData {
    constructor(symbol,graphTheYear) {
        this.graphTheYear = graphTheYear
        // this.plotStockGraph(symbol)  // if handle options click called plot instead of fetchAnd
        this.stockData = null
        this.firstSearch = true
        this.symbol = symbol
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
    return this.parseGraphData(this.stockData)
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
    let x = this.graphTheYear === true ? 52 : 4

    let timestamps = Object.keys(timeSeriesData).slice(0, x).reverse(); // Get the first 52 or 4timestamps (past year : past month)
    const stockPrices = timestamps.map((timestamp) => parseFloat(timeSeriesData[timestamp]['4. close']));
    this.plotStockGraph(this.symbol,timestamps,stockPrices)
    // return this.firstSearch ? this.plotStockGraph(this.symbol) : {timestamps,stockPrices};
    // return {timestamps,stockPrices};
    
}

// Plot stock data on a graph
plotStockGraph = async (symbol,timestamps,stockPrices) => {

    const canvas = document.getElementById('stock-chart')
    const ctx = canvas.getContext('2d');

    if (canvas.chart) {
        canvas.chart.destroy();
        delete canvas.chart; // Remove the chart property
      }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: `${symbol} Stock Price - ${this.graphTheYear ? "52" : "4"} Weeks`,
            data: stockPrices,
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

fetchAndPlotStockGraph = async (symbol = "aapl") => {
    if (!this.stockData) {
      // Fetch stock data if not already fetched
      await this.fetchStockData(symbol);
      this.firstSearch = false
    }

    // Plot stock graph using the fetched data
    else {
        console.log(6)
      this.parseGraphData(this.stockData);
    }
  };

}
