
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

const modalContainer = document.getElementById('modal-container');
const modalOverlay = document.getElementById('modal-overlay');
const openModalButton = document.getElementById('notice-to-user');
const stockInput = document.getElementById('stock-input');

function openModal() {
  modalContainer.style.display = 'flex';
}

function closeModal() {
  modalContainer.style.display = 'none';
}

// Add event listener to open modal button or trigger element
openModalButton.addEventListener('click', openModal);

// Add event listener to close modal button or overlay
modalOverlay.addEventListener('click', closeModal);
stockInput.addEventListener('click', closeModal);
