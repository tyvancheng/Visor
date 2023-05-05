import Example from './scripts/example'
document.addEventListener('DOMContentLoaded', () => {
    console.log("hello");

    const main = document.getElementById('main');
    new Example(main)
})