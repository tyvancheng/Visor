import "./fetch"
export default class StockData {
    constructor(symbol,timeFrame) {
        this.timeFrame = timeFrame
        // this.plotStockGraph(symbol)  // if handle options click called plot instead of fetchAnd
        this.stockData = null
        this.firstSearch = true
        this.symbol = symbol
    }
// Fetch data from Alpha Vantage API for the past year
fetchStockData = async (symbol) => {

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=EMX9C3VLWA4KWGK1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Extract data for the past year
    const timeSeriesData = data['Time Series (Daily)']; // Keys into the nested object
    this.stockData = timeSeriesData
    // console.log(timeSeriesData)
    return this.parseGraphData(this.stockData)

  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

parseGraphData = (timeSeriesData) => {
    let x = 365
    console.log(this.timeFrame)
    switch (this.timeFrame) {
        case "1-Week":
            x = 5;
            break;
        case "1-Month":
            x = 22;
            break;
        case "3-Month":
            x = 65;
            break;
        case "6-Month":
            x = 125;
            break;
        case "1-Year":
            x = 252;
            break;
        case "5-Years":
            x = 1260;
            break;
     
    }
    let timestamps = Object.keys(timeSeriesData).slice(0, x).reverse(); // array of all datapoints
   
    while (timestamps.length > 99) {
        const deletionCount = timestamps.length - 99;
        // console.log(deletionCount)
        const step = Math.ceil(timestamps.length / 99);
        // console.log(step)
        let index = 0;
            for (let deleted = 0; deleted < deletionCount; deleted++) {
                if (index < timestamps.length - 10) timestamps.splice(index, 1); // Delete one element at the current index
                index += step; // Increment the index by the step size
            }
    
    }
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
            label: `${symbol} Stock Price - ${this.timeFrame}`,
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
      // this.firstSearch = false
    }

    // Plot stock graph using the fetched data
    else {
      this.parseGraphData(this.stockData);
    }
  };
}