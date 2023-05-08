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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_searchBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/searchBar.js */ \"./src/scripts/searchBar.js\");\n\n// import { search } from \"core-js/fn/symbol\";\n\n\nconst searchBar = new _scripts_searchBar_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack://proj/./src/index.js?");

/***/ }),

/***/ "./src/scripts/monthlyData.js":
/*!************************************!*\
  !*** ./src/scripts/monthlyData.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ MonthlyData; }\n/* harmony export */ });\n\nclass MonthlyData {\n    constructor(symbol) {\n        // this.symbol = symbol\n        this.plotStockGraph(symbol)\n    }\n\n// Fetch data from Alpha Vantage API for the past year\nfetchStockData = async (symbol) => {\n\n  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=EMX9C3VLWA4KWGK1`;\n\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    // Extract data for the past year\n    const timeSeriesData = data['Monthly Time Series'];\n    const timestamps = Object.keys(timeSeriesData).slice(0, 12); // Get the first 12 timestamps (past year)\n    const stockPrices = timestamps.map((timestamp) => parseFloat(timeSeriesData[timestamp]['4. close']));\n\n    return {timestamps,stockPrices};\n\n  } catch (error) {\n    console.log('Error:', error);\n    return null;\n  }\n};\n\n// Plot stock data on a graph\nplotStockGraph = async (symbol) => {\n  const stockData = await this.fetchStockData(symbol);\n//    console.log(stockData)\n  if (stockData) {\n    const ctx = document.getElementById('stock-chart').getContext('2d');\n    \n    // if (canvas.chart) {\n    //     canvas.chart.destroy();\n\n    new Chart(ctx, {\n      type: 'line',\n      data: {\n        labels: stockData.timestamps,\n        datasets: [\n          {\n            label: `${symbol} Stock Price`,\n            data: stockData.stockPrices,\n            borderColor: 'black',\n            backgroundColor: 'white',\n          },\n        ],\n      },\n      options: {\n        responsive: true,\n        scales: {\n          x: {\n            display: true,\n            title: {\n              display: true,\n              text: 'Timestamp',\n            },\n            // type: 'time',\n            // time: {\n            //   displayFormats: {\n            //     day: 'MM-DD',\n            //   },\n            // },\n            // title: {\n            //   display: true,\n            //   text: 'Timestamp',\n            // },\n          },\n          y: {\n            display: true,\n            title: {\n              display: true,\n              text: 'Stock Price',\n            },\n          },\n        },\n      },\n    });\n  }\n};\n\n// Call the function to plot the graph for a specific stock symbol\n\n}\n\n\n//# sourceURL=webpack://proj/./src/scripts/monthlyData.js?");

/***/ }),

/***/ "./src/scripts/searchBar.js":
/*!**********************************!*\
  !*** ./src/scripts/searchBar.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SearchBar; }\n/* harmony export */ });\n/* harmony import */ var _monthlyData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monthlyData */ \"./src/scripts/monthlyData.js\");\n\n\nclass SearchBar {\n    constructor() {\n        this.searchInput = document.getElementById('stock-input');\n        this.stockList = document.getElementById('stock-list');\n        this.inputListener()\n        this.stockListOptionsListener()\n    }\n    // const stockOptions = dropdownMenu.getElementsByTagName('list');\n\n    fetchStocks = searchText => {\n        return new Promise((resolve, reject) => {\n          fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`)\n            .then(res => res.json())\n            .then(data => {\n              const bestMatches = data.bestMatches || [];\n              const usSymbols = bestMatches\n                .filter(match => match['4. region'] === 'United States')\n                // .map(match => match['1. symbol']);\n                    // name: match['2. name']\n                .map(match => `${match['1. symbol']}, ${match['2. name']}`)\n                // fix this ^^ see what it console.logs\n              resolve(usSymbols);\n            })\n            .catch(error => {\n              reject(error);\n            });\n        });\n      };      \n\n    showStocks = async searchText => {\n        try {\n            const stocks = await this.fetchStocks(searchText);\n            // console.log(stocks)\n\n            // Clear previous search results\n            while (this.stockList.firstChild) {\n                this.stockList.removeChild(this.stockList.firstChild);\n            }\n\n            if (Array.isArray(stocks)) {\n                stocks.forEach(stock => {\n                    const li = document.createElement('li');\n                    li.innerText = stock;\n                    li.setAttribute('value', stock.split(\", \")[0])\n                    this.stockList.appendChild(li);\n                });\n            } else {\n                // Handle the case when the response is not an array\n                console.log('Invalid API response:',stocks);\n            }\n        } catch (error) {\n            console.log('Error:', error);\n        }\n    };\n    \n    inputListener = () => {\n        this.searchInput.addEventListener('input', () => {\n            const searchText = this.searchInput.value.trim();\n            if (searchText.length > 0) {\n                this.showStocks(searchText);\n            } else {\n                // Clear search results if search input is empty\n                while (this.stockList.firstChild) {\n                    this.stockList.removeChild(this.stockList.firstChild);\n                }\n            }\n        });\n    }\n    \n    stockListOptionsListener = () => {\n        this.stockList.addEventListener('click', (event) => {\n            const eventTicker = event.target.innerText.split(\", \")[0]\n            // console.log(eventTicker);\n            let graph = new _monthlyData__WEBPACK_IMPORTED_MODULE_0__[\"default\"](eventTicker);\n            graph.plotStockGraph(eventTicker);\n\n        });\n    }\n};\n\n//# sourceURL=webpack://proj/./src/scripts/searchBar.js?");

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