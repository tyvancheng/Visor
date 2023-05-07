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

eval("// console.log(\"bye\")\n// document.addEventListener('DOMContentLoaded', () => {\n\n//     const searchInput = document.getElementById('stock-input');\n//     const stockList = document.getElementById('stock-list');\n  \n//     const fetchStocks = async searchText => {\n//       const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`);\n//       const stocks = await res.json();\n//       return stocks;\n//     }\n  \n//     const showStocks = async searchText => {\n//       const stocks = await fetchStocks(searchText);\n  \n//       // Clear previous search results\n//       while (stockList.firstChild) {\n//         stockList.removeChild(stockList.firstChild);\n//       }\n  \n//       stocks.forEach(stock => {\n//         const li = document.createElement('li');\n//         li.innerText = stock.symbol;\n//         stockList.appendChild(li);\n//       });\n//     }\n  \n//     searchInput.addEventListener('input', () => {\n//       const searchText = searchInput.value.trim();\n//       if (searchText.length > 0) {\n//         showStocks(searchText);\n//       } else {\n//         // Clear search results if search input is empty\n//         while (stockList.firstChild) {\n//           stockList.removeChild(stockList.firstChild);\n//         }\n//       }\n//     });\n  \n//   });\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const searchInput = document.getElementById('stock-input');\n    const stockList = document.getElementById('stock-list');\n\n    const fetchStocks = searchText => {\n        return new Promise((resolve, reject) => {\n          fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`)\n            .then(res => res.json())\n            .then(data => {\n              const bestMatches = data.bestMatches || [];\n              const usSymbols = bestMatches\n                .filter(match => match['4. region'] === 'United States')\n                // .map(match => match['1. symbol']);\n                    // name: match['2. name']\n                .map(match => `${match['1. symbol']}, ${match['2. name']}`)\n                // fix this ^^ see what it console.logs\n                    \n    \n      \n              resolve(usSymbols);\n            })\n            .catch(error => {\n              reject(error);\n            });\n        });\n      };      \n\n\n    const showStocks = async searchText => {\n        try {\n            const stocks = await fetchStocks(searchText);\n            // console.log(stocks)\n\n            // Clear previous search results\n            while (stockList.firstChild) {\n                stockList.removeChild(stockList.firstChild);\n            }\n\n            if (Array.isArray(stocks)) {\n                stocks.forEach(stock => {\n                    const li = document.createElement('li');\n                    li.innerText = stock;\n                    stockList.appendChild(li);\n                });\n            } else {\n                // Handle the case when the response is not an array\n                console.log('Invalid API response:',stocks);\n            }\n        } catch (error) {\n            console.log('Error:', error);\n        }\n    };\n\n    searchInput.addEventListener('input', () => {\n        const searchText = searchInput.value.trim();\n        if (searchText.length > 0) {\n            showStocks(searchText);\n        } else {\n            // Clear search results if search input is empty\n            while (stockList.firstChild) {\n                stockList.removeChild(stockList.firstChild);\n            }\n        }\n    });\n});\n\n  \n  \n  \n  \n\n//# sourceURL=webpack://proj/./src/index.js?");

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