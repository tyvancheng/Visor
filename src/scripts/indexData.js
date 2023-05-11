import { fetchStockData, parseGraphData } from "./fetch.js"

export default class IndexData {
    constructor() {
        // this.timeFrame = timeFrame
        this.timeFrame = null
        // this.plotStockGraph(symbol)  // if handle options click called plot instead of fetchAnd
        this.stockData = null
        // this.firstSearch = true
        // this.symbol = symbol
        this.timestamps = null
        this.stockPrices = null
        this.allTimesAndPricesObj = {}
    }

fetchAndPlotStockGraph = async (timeFrame,symbol = "aapl") => {
  
  this.timeFrame = timeFrame

    if (!this.stockData) {
      // Fetch stock data if not already fetched
      this.stockData = await fetchStockData.call(this,symbol);
      let megaData = parseGraphData.call(this,this.stockData,this.timeFrame,this.timestamps,this.stockPrices)
      this.timestamps = megaData[0]
      this.stockPrices = megaData[1]
      // this.firstSearch = false
    }

    // Plot stock graph using the fetched data
    else {
      let megaData = parseGraphData(this.stockData,this.timeFrame,this.timestamps,this.stockPrices);
      this.timestamps = megaData[0]
      this.stockPrices = megaData[1]
    }
    // console.log(this.timestamps)
    // console.log(this.stockPrices)
    this.plotStockGraph(symbol,this.timestamps,this.stockPrices)
  };
}


// createIndexInstance = (symbol) => {
//     let timeFrames = ["1-Week","1-Month","3-Month","6-Month","1-Year","5-Year"]
//     let index = new IndexData()
//     let graph = new IndexData(symbol)
//     timeFrames.forEach(time => {
//         index.fetchAndPlotStockGraph(time,"spy")
//         graph.fetchAndPlotStockGraph(time,symbol)


//     })


// }

// will save time stamps for future implementation

