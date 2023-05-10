const apiKey = 'YOUR_NEWS_API_KEY';
const ticker = 'ZM'; // Replace with the ticker you want to search for
const container = document.getElementById('article-container'); // Replace with the ID of the container element in your HTML

// Function to fetch and render news articles
async function fetchAndRenderArticles() {
  const url = `https://newsapi.org/v2/everything?q=${ticker}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      const articles = data.articles;
      renderArticles(articles);
    } else {
      console.log('Error:', data.message);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Function to render articles on the webpage
function renderArticles(articles) {
  articles.forEach((article) => {
    const articleContainer = document.createElement('div');

    const image = document.createElement('img');
    image.src = article.urlToImage;
    articleContainer.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = article.title;
    articleContainer.appendChild(title);

    const description = document.createElement('p');
    description.textContent = article.description;
    articleContainer.appendChild(description);

    container.appendChild(articleContainer);
  });
}

// Call the fetchAndRenderArticles function
fetchAndRenderArticles();
