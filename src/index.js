
// import { search } from "core-js/fn/symbol";
import SearchBar from "./scripts/searchBar.js"
import MonthlyData from "./scripts/monthlyData.js";
const searchBar = new SearchBar();
const etf = new MonthlyData("spy");

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const animationElements = document.querySelectorAll('.container, .left-side, .right-side');
  
    button.addEventListener('click', () => {
      animationElements.forEach(element => {
        element.style.animationPlayState = 'running';
      });    
    });
  });
