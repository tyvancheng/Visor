import MonthlyData from "./monthlyData";

export default class SearchBar {
    constructor() {
        this.searchInput = document.getElementById('stock-input');
        this.stockList = document.getElementById('stock-list');
        this.inputListener()
        this.stockListOptionsListener()
    }
    // const stockOptions = dropdownMenu.getElementsByTagName('list');

    fetchStocks = searchText => {
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

    showStocks = async searchText => {
        try {
            const stocks = await this.fetchStocks(searchText);
            // console.log(stocks)

            // Clear previous search results
            while (this.stockList.firstChild) {
                this.stockList.removeChild(this.stockList.firstChild);
            }

            if (Array.isArray(stocks)) {
                stocks.forEach(stock => {
                    const li = document.createElement('li');
                    li.innerText = stock;
                    li.setAttribute('value', stock.split(", ")[0])
                    this.stockList.appendChild(li);
                });
            } else {
                // Handle the case when the response is not an array
                console.log('Invalid API response:',stocks);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
    inputListener = () => {
        this.searchInput.addEventListener('input', () => {
            const searchText = this.searchInput.value.trim();
            if (searchText.length > 0) {
                this.showStocks(searchText);
            } else {
                // Clear search results if search input is empty
                while (this.stockList.firstChild) {
                    this.stockList.removeChild(this.stockList.firstChild);
                }
            }
        });
    }
    
    stockListOptionsListener = () => {
        this.stockList.addEventListener('click', (event) => {
            const eventTicker = event.target.innerText.split(", ")[0]
            // console.log(eventTicker);
            let graph = new MonthlyData(eventTicker);
            graph.plotStockGraph(eventTicker);

        });
    }
};