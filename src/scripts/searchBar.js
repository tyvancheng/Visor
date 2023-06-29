import MonthlyData from "./monthlyData";
import { calculateBeta } from "./betaCalculator";

export default class SearchBar {
    constructor() {
        this.searchInput = document.getElementById('stock-input');
        this.stockList = document.getElementById('stock-list');
        this.inputListener()
        this.handleStockOptionsClick()
        this.etf = new MonthlyData("spy", "1-Year", true);
        this.etfStockData = null;
    }
    // const stockOptions = dropdownMenu.getElementsByTagName('list');

    fetchStocks = searchText => {
        return new Promise((resolve, reject) => {
            //   fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=EMX9C3VLWA4KWGK1`)
            fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${searchText}`)
                .then(res => res.json())
                .then(data => {

                    const bestMatches = data || [];
                    const usSymbols = bestMatches
                        // .filter(match => match['4. region'] === 'United States')
                        .map(match => `${match['symbol']}, ${match['name']}`)

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
                console.log('Invalid API response:', stocks);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    inputListener = () => {
        this.searchInput.addEventListener('input', () => {

            const searchText = this.searchInput.value.trim();

            if (searchText.length > 0) {
                this.stockList.style.display = ''
                this.showStocks(searchText);
            } else {
                // Clear search results if search input is empty
                while (this.stockList.firstChild) {
                    this.stockList.removeChild(this.stockList.firstChild);
                }
                this.stockList.style.display = 'none'

            }
        });
    }

    handleStockOptionsClick = () => {
        this.stockList.addEventListener('click', async (event) => {
            const button = document.getElementById("1-Year-button")
            const timeFrameButtons = document.querySelectorAll(".timeFrameButton")
            const mainBody = document.getElementById("main-body-container")
            const graphButtons = document.getElementsByClassName(".button-container")
            const eventTicker = event.target.innerText.split(", ")[0]
            const graphContainer = document.getElementById("graph")
            // const timeFrameButtons = document.querySelectorAll(".timeFrameButton")
            timeFrameButtons.forEach(btn => {
                if (btn !== button) { // if 1 year tab isnt clicked, click it
                    btn.classList.remove('active');
                } else {
                    button.classList.add('active')
                }
            })

            let graph = new MonthlyData(eventTicker, "1-Year");
            await graph.fetchAndPlotStockGraph(eventTicker);

            await this.etf.fetchAndPlotStockGraph("spy");

            // graphContainer.style.display = 'block'
            // graphButtons.style.display = 'flex'
            // leftSide.style.display = 'block'
            debugger
            const beta = calculateBeta(graph.stockData, this.etf.stockData)
            debugger
            mainBody.style.display = 'flex'



            this.searchInput.value = "";
            while (this.stockList.firstChild) {
                this.stockList.removeChild(this.stockList.firstChild);
            }

            this.handleTimeFrameClick(graph, this.etf)
        });
    }

    handleTimeFrameClick = (graph, etf) => {
        const timeFrameButtons = document.querySelectorAll(".timeFrameButton")
        timeFrameButtons.forEach(button => {
            button.style.display = 'block'
            button.addEventListener('click', () => {
                if (graph.graphTheYear !== button.value) {
                    graph.graphTheYear = button.value
                    etf.graphTheYear = button.value
                    debugger
                    graph.fetchAndPlotStockGraph()
                    // this.etfStockData = etf.fetchAndPlotStockGraph()
                }
                button.classList.add('active');
                graph.graphTheYear = button.value
                // Set other buttons to red
                timeFrameButtons.forEach(btn => {
                    if (btn !== button) {
                        btn.classList.remove('active');
                    }
                })
            })
            // if graph is on dont let it click again

        })
    };
}