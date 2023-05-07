// console.log("bye")
// document.addEventListener('DOMContentLoaded', () => {

//     const searchInput = document.getElementById('stock-input');
//     const stockList = document.getElementById('stock-list');
  
//     const fetchStocks = async searchText => {
//       const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`);
//       const stocks = await res.json();
//       return stocks;
//     }
  
//     const showStocks = async searchText => {
//       const stocks = await fetchStocks(searchText);
  
//       // Clear previous search results
//       while (stockList.firstChild) {
//         stockList.removeChild(stockList.firstChild);
//       }
  
//       stocks.forEach(stock => {
//         const li = document.createElement('li');
//         li.innerText = stock.symbol;
//         stockList.appendChild(li);
//       });
//     }
  
//     searchInput.addEventListener('input', () => {
//       const searchText = searchInput.value.trim();
//       if (searchText.length > 0) {
//         showStocks(searchText);
//       } else {
//         // Clear search results if search input is empty
//         while (stockList.firstChild) {
//           stockList.removeChild(stockList.firstChild);
//         }
//       }
//     });
  
//   });

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('stock-input');
    const stockList = document.getElementById('stock-list');

    const fetchStocks = searchText => {
        return new Promise((resolve, reject) => {
          fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`)
            .then(res => res.json())
            .then(data => {
              const bestMatches = data.bestMatches || [];
              const usSymbols = bestMatches
                .filter(match => match['4. region'] === 'United States')
                // .map(match => match['1. symbol']);
                    // name: match['2. name']
                .map(match => `${match['1. symbol']}, ${match['2. name']}`)
                // fix this ^^ see what it console.logs
                    
    
      
              resolve(usSymbols);
            })
            .catch(error => {
              reject(error);
            });
        });
      };      


    const showStocks = async searchText => {
        try {
            const stocks = await fetchStocks(searchText);
            // console.log(stocks)

            // Clear previous search results
            while (stockList.firstChild) {
                stockList.removeChild(stockList.firstChild);
            }

            if (Array.isArray(stocks)) {
                stocks.forEach(stock => {
                    const li = document.createElement('li');
                    li.innerText = stock;
                    stockList.appendChild(li);
                });
            } else {
                // Handle the case when the response is not an array
                console.log('Invalid API response:',stocks);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.trim();
        if (searchText.length > 0) {
            showStocks(searchText);
        } else {
            // Clear search results if search input is empty
            while (stockList.firstChild) {
                stockList.removeChild(stockList.firstChild);
            }
        }
    });
});

  
  
  
  