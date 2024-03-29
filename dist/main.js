/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data/dataHolder.js":
/*!********************************!*\
  !*** ./src/data/dataHolder.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"stockDataHolder\": function() { return /* binding */ stockDataHolder; }\n/* harmony export */ });\nconst stockDataHolder = {}\n\n//# sourceURL=webpack://proj/./src/data/dataHolder.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_searchBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/searchBar.js */ \"./src/scripts/searchBar.js\");\n/* harmony import */ var _scripts_monthlyData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/monthlyData.js */ \"./src/scripts/monthlyData.js\");\n\n// import { search } from \"core-js/fn/symbol\";\n\n\nconst searchBar = new _scripts_searchBar_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst etf = new _scripts_monthlyData_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"spy\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const button = document.querySelector('button');\n  const animationElements = document.querySelectorAll('.container, .left-side, .right-side');\n\n  button.addEventListener('click', () => {\n    animationElements.forEach(element => {\n      element.style.animationPlayState = 'running';\n    });\n  });\n});\n\nconst modalContainer = document.getElementById('modal-container');\nconst modalOverlay = document.getElementById('modal-overlay');\nconst openModalButton = document.getElementById('notice-to-user');\nconst stockInput = document.getElementById('stock-input');\n\nfunction openModal() {\n  modalContainer.style.display = 'flex';\n}\n\nfunction closeModal() {\n  modalContainer.style.display = 'none';\n}\n\n// Add event listener to open modal button or trigger element\nopenModalButton.addEventListener('click', openModal);\n\n// Add event listener to close modal button or overlay\nmodalOverlay.addEventListener('click', closeModal);\nstockInput.addEventListener('click', closeModal);\n\n\n//# sourceURL=webpack://proj/./src/index.js?");

/***/ }),

/***/ "./src/scripts/betaCalculator.js":
/*!***************************************!*\
  !*** ./src/scripts/betaCalculator.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculateBeta\": function() { return /* binding */ calculateBeta; }\n/* harmony export */ });\n// Assuming you have arrays of historical stock returns and benchmark returns\nconst stockReturns = [/* stock returns array */];\nconst benchmarkReturns = [/* benchmark returns array */];\n\n// Function to calculate the beta coefficient\nconst calculateBeta = (stockReturns, benchmarkReturns) => {\n    debugger\n    const returnOrganizer = (returns) => {\n        return Object.values(returns).map(day => parseInt(Object.values(day)[3]))\n    }\n   \n    stockReturns = returnOrganizer(stockReturns)\n    benchmarkReturns = returnOrganizer(benchmarkReturns)\n    \n    // Adjust the array lengths to make them equal\n    const maxLength = Math.max(stockReturns.length, benchmarkReturns.length);\n        if (stockReturns.length < maxLength) {\n            const diff = maxLength - stockReturns.length;\n            stockReturns = stockReturns.concat(stockReturns.slice(-diff));\n        } else if (benchmarkReturns.length < maxLength) {\n            const diff = maxLength - benchmarkReturns.length;\n            benchmarkReturns = benchmarkReturns.concat(benchmarkReturns.slice(-diff));\n        }\n\n    // Calculate the average returns\n    debugger\n    const sumReducer = (x) => {\n      return x.reduce((sum, ret) => parseInt(sum) + parseInt(ret), 0) / x.length;\n    }\n    const stockAvgReturn = sumReducer(stockReturns)\n    const benchmarkAvgReturn = sumReducer(benchmarkReturns)\ndebugger\n    // Calculate the covariance between stock and benchmark returns\n    let covariance = 0;\n    for (let i = 0; i < stockReturns.length; i++) {\n        covariance += (stockReturns[i] - stockAvgReturn) * (benchmarkReturns[i] - benchmarkAvgReturn);\n    }\n    covariance /= stockReturns.length;\n    debugger\n\n    // Calculate the variance of the benchmark returns\n    let benchmarkVariance = 0;\n    for (let i = 0; i < benchmarkReturns.length; i++) {\n        benchmarkVariance += Math.pow(benchmarkReturns[i] - benchmarkAvgReturn, 2);\n    }\n    benchmarkVariance /= benchmarkReturns.length;\n\n    // Calculate the beta coefficient\n    const beta = covariance / benchmarkVariance;\n    debugger\n    return `Beta: ${beta}`;\n \n};\n\n\n\n//# sourceURL=webpack://proj/./src/scripts/betaCalculator.js?");

/***/ }),

/***/ "./src/scripts/monthlyData.js":
/*!************************************!*\
  !*** ./src/scripts/monthlyData.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ MonthlyData; }\n/* harmony export */ });\n/* harmony import */ var _data_dataHolder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/dataHolder */ \"./src/data/dataHolder.js\");\n\n\n\nclass MonthlyData {\n  constructor(symbol, graphTheYear, etf = null) {\n    this.graphTheYear = graphTheYear\n    // this.plotStockGraph(symbol)  // if handle options click called plot instead of fetchAnd\n    this.stockData = null\n    this.firstSearch = true\n    this.symbol = symbol\n    this.etf = etf\n  }\n  // Fetch data from Alpha Vantage API for the past year\n  fetchStockData = async (symbol) => {\n\n    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=EMX9C3VLWA4KWGK1`;\n\n    try {\n      const response = await fetch(url);\n      debugger\n      const data = await response.json();\n      // Extract data for the past year\n      console.log(data);\n      const timeSeriesData = data['Time Series (Daily)']; // Keys into the nested object\n      debugger\n      this.stockData = timeSeriesData\n\n      _data_dataHolder__WEBPACK_IMPORTED_MODULE_0__.stockDataHolder[symbol] = timeSeriesData\n      return this.parseGraphData(this.stockData)\n\n    } catch (error) {\n      console.log('Error:', error);\n      return null;\n    }\n  };\n\n  parseGraphData = (timeSeriesData) => {\n    let x = 365\n    switch (this.graphTheYear) {\n      case \"1-Week\":\n        x = 5;\n        break;\n      case \"4-Week\":\n        x = 22;\n        break;\n      case \"3-Month\":\n        x = 62;\n        break;\n      case \"6-Month\":\n        x = 126;\n        break;\n      case \"1-Year\":\n        x = 252;\n        break;\n      case \"5-Years\":\n        x = 1260;\n        break;\n    }\n    let timestamps = Object.keys(timeSeriesData).slice(0, x).reverse(); // Get the first 52 or 4timestamps (past year : past month)\n\n    while (timestamps.length > 99) {\n      const deletionCount = timestamps.length - 99;\n      // console.log(deletionCount)\n      const step = Math.ceil(timestamps.length / 99);\n      // console.log(step)\n      let index = 0;\n      for (let deleted = 0; deleted < deletionCount; deleted++) {\n        if (index < timestamps.length - 10) timestamps.splice(index, 1); // Delete one element at the current index\n        index += step; // Increment the index by the step size\n      }\n    }\n    const stockPrices = timestamps.map((timestamp) => parseFloat(timeSeriesData[timestamp]['4. close']));\n    if (this.etf === null) {\n      this.plotStockGraph(this.symbol, timestamps, stockPrices)\n    } else {\n      return stockPrices\n    }\n    // return this.firstSearch ? this.plotStockGraph(this.symbol) : {timestamps,stockPrices};\n    // return {timestamps,stockPrices};\n\n  }\n\n  // Plot stock data on a graph\n  plotStockGraph = async (symbol, timestamps, stockPrices) => {\n\n    const canvas = document.getElementById('stock-chart')\n    const ctx = canvas.getContext('2d');\n\n    if (canvas.chart) {\n      canvas.chart.destroy();\n      delete canvas.chart; // Remove the chart property\n    }\n\n    const chart = new Chart(ctx, {\n      type: 'line',\n      data: {\n        labels: timestamps,\n        datasets: [\n          {\n            label: `${symbol} Stock Price - ${this.graphTheYear}`,\n            data: stockPrices,\n            borderColor: 'black',\n            backgroundColor: 'white',\n          },\n        ],\n      },\n      options: {\n        responsive: true,\n        scales: {\n          x: {\n            display: true,\n            title: {\n              display: true,\n              text: 'Timestamp',\n            },\n          },\n          y: {\n            display: true,\n            title: {\n              display: true,\n              text: 'Stock Price',\n            },\n          },\n        },\n      },\n    });\n    canvas.chart = chart;\n    //   }\n  };\n\n  fetchAndPlotStockGraph = async (symbol = \"aapl\") => {\n    if (!this.stockData) {\n      debugger\n      // Fetch stock data if not already fetched\n      await this.fetchStockData(symbol);\n      this.firstSearch = false\n    }\n\n    // Plot stock graph using the fetched data\n    else {\n      debugger\n      this.parseGraphData(this.stockData);\n    }\n  };\n}\n\n\n//# sourceURL=webpack://proj/./src/scripts/monthlyData.js?");

/***/ }),

/***/ "./src/scripts/searchBar.js":
/*!**********************************!*\
  !*** ./src/scripts/searchBar.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SearchBar; }\n/* harmony export */ });\n/* harmony import */ var _monthlyData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monthlyData */ \"./src/scripts/monthlyData.js\");\n/* harmony import */ var _betaCalculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./betaCalculator */ \"./src/scripts/betaCalculator.js\");\n\n\n\nclass SearchBar {\n    constructor() {\n        this.searchInput = document.getElementById('stock-input');\n        this.stockList = document.getElementById('stock-list');\n        this.inputListener()\n        this.handleStockOptionsClick()\n        this.etf = new _monthlyData__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"spy\", \"1-Year\", true);\n        this.etfStockData = null;\n    }\n    // const stockOptions = dropdownMenu.getElementsByTagName('list');\n\n    fetchStocks = searchText => {\n        return new Promise((resolve, reject) => {\n            //   fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`)\n            fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${searchText}`)\n                .then(res => res.json())\n                .then(data => {\n\n                    const bestMatches = data || [];\n                    const usSymbols = bestMatches\n                        // .filter(match => match['4. region'] === 'United States')\n                        .map(match => `${match['symbol']}, ${match['name']}`)\n\n                    resolve(usSymbols);\n                })\n                .catch(error => {\n                    reject(error);\n                });\n        });\n    };\n\n    showStocks = async searchText => {\n        try {\n            const stocks = await this.fetchStocks(searchText);\n            // console.log(stocks)\n\n            // Clear previous search results\n            while (this.stockList.firstChild) {\n                this.stockList.removeChild(this.stockList.firstChild);\n            }\n\n            if (Array.isArray(stocks)) {\n\n                stocks.forEach(stock => {\n                    const li = document.createElement('li');\n                    li.innerText = stock;\n                    li.setAttribute('value', stock.split(\", \")[0])\n                    this.stockList.appendChild(li);\n                });\n\n            } else {\n                // Handle the case when the response is not an array\n                console.log('Invalid API response:', stocks);\n            }\n        } catch (error) {\n            console.log('Error:', error);\n        }\n    };\n\n    inputListener = () => {\n        this.searchInput.addEventListener('input', () => {\n\n            const searchText = this.searchInput.value.trim();\n\n            if (searchText.length > 0) {\n                this.stockList.style.display = ''\n                this.showStocks(searchText);\n            } else {\n                // Clear search results if search input is empty\n                while (this.stockList.firstChild) {\n                    this.stockList.removeChild(this.stockList.firstChild);\n                }\n                this.stockList.style.display = 'none'\n\n            }\n        });\n    }\n\n    handleStockOptionsClick = () => {\n        this.stockList.addEventListener('click', async (event) => {\n            const button = document.getElementById(\"1-Year-button\")\n            const timeFrameButtons = document.querySelectorAll(\".timeFrameButton\")\n            const mainBody = document.getElementById(\"main-body-container\")\n            const graphButtons = document.getElementsByClassName(\".button-container\")\n            const eventTicker = event.target.innerText.split(\", \")[0]\n            const graphContainer = document.getElementById(\"graph\")\n            // const timeFrameButtons = document.querySelectorAll(\".timeFrameButton\")\n            timeFrameButtons.forEach(btn => {\n                if (btn !== button) { // if 1 year tab isnt clicked, click it\n                    btn.classList.remove('active');\n                } else {\n                    button.classList.add('active')\n                }\n            })\n\n            let graph = new _monthlyData__WEBPACK_IMPORTED_MODULE_0__[\"default\"](eventTicker, \"1-Year\");\n            await graph.fetchAndPlotStockGraph(eventTicker);\n            console.log(\"hi\");\n            debugger\n            await this.etf.fetchAndPlotStockGraph(\"spy\");\n\n            graphContainer.style.display = 'block'\n            // graphButtons.style.display = 'flex'\n            // leftSide.style.display = 'block'\n            debugger\n            // const beta = calculateBeta(graph.stockData, this.etf.stockData)\n            debugger\n            // mainBody.style.display = 'flex'\n\n\n\n            this.searchInput.value = \"\";\n            while (this.stockList.firstChild) {\n                this.stockList.removeChild(this.stockList.firstChild);\n            }\n\n            this.handleTimeFrameClick(graph, this.etf)\n        });\n    }\n\n    handleTimeFrameClick = (graph, etf) => {\n        const timeFrameButtons = document.querySelectorAll(\".timeFrameButton\")\n        timeFrameButtons.forEach(button => {\n            button.style.display = 'block'\n            button.addEventListener('click', () => {\n                if (graph.graphTheYear !== button.value) {\n                    graph.graphTheYear = button.value\n                    etf.graphTheYear = button.value\n                    debugger\n                    graph.fetchAndPlotStockGraph()\n                    // this.etfStockData = etf.fetchAndPlotStockGraph()\n                }\n                button.classList.add('active');\n                graph.graphTheYear = button.value\n                // Set other buttons to red\n                timeFrameButtons.forEach(btn => {\n                    if (btn !== button) {\n                        btn.classList.remove('active');\n                    }\n                })\n            })\n            // if graph is on dont let it click again\n\n        })\n    };\n}\n\n//# sourceURL=webpack://proj/./src/scripts/searchBar.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;