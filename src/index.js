console.log("bye")
document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('stock-input');
    const stockList = document.getElementById('stock-list');
  
    const fetchStocks = async searchText => {
      const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=EMX9C3VLWA4KWGK1?q=${searchText}`);
      const stocks = await res.json();
      return stocks;
    }
  
    const showStocks = async searchText => {
      const stocks = await fetchStocks(searchText);
  
      // Clear previous search results
      while (stockList.firstChild) {
        stockList.removeChild(stockList.firstChild);
      }
  
      stocks.forEach(stock => {
        const li = document.createElement('li');
        li.innerText = stock.symbol;
        stockList.appendChild(li);
      });
    }
  
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
  
  