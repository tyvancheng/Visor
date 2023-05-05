/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("console.log(\"bye\")\ndocument.addEventListener('DOMContentLoaded', () => {\n\n    const searchInput = document.getElementById('stock-input');\n    const stockList = document.getElementById('stock-list');\n  \n    const fetchStocks = async searchText => {\n      const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=EMX9C3VLWA4KWGK1?q=${searchText}`);\n      const stocks = await res.json();\n      return stocks;\n    }\n  \n    const showStocks = async searchText => {\n      const stocks = await fetchStocks(searchText);\n  \n      // Clear previous search results\n      while (stockList.firstChild) {\n        stockList.removeChild(stockList.firstChild);\n      }\n  \n      stocks.forEach(stock => {\n        const li = document.createElement('li');\n        li.innerText = stock.symbol;\n        stockList.appendChild(li);\n      });\n    }\n  \n    searchInput.addEventListener('input', () => {\n      const searchText = searchInput.value.trim();\n      if (searchText.length > 0) {\n        showStocks(searchText);\n      } else {\n        // Clear search results if search input is empty\n        while (stockList.firstChild) {\n          stockList.removeChild(stockList.firstChild);\n        }\n      }\n    });\n  \n  });\n  \n  \n\n//# sourceURL=webpack://proj/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;