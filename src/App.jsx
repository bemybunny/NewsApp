import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const newsRef = useRef(null); // Ref for news container

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = 'a2479f68ac3143beafb35f7d1a816adc';
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        console.log(response);
        const uniqueArticles = response.data.articles.filter(
          (article, index, self) =>
            index === self.findIndex((t) => t.url === article.url)
        );
        setArticles(uniqueArticles || []);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchNews();
  }, [category]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage * articlesPerPage < articles.length) {
      setCurrentPage(prevPage => prevPage + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Technology News</h1>
        <div className="flex justify-center mb-6">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 rounded bg-gray-200"
          >
            <option value="">All</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div ref={newsRef}>
          {articles.length > 0 ? (
            <ul className="space-y-4">
              {articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage).map((article, index) => (
                <li key={index} className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="text-gray-600">{article.description}</p>
                  {article.urlToImage && (
                    <img
                      className="w-full h-64 object-cover mt-4"
                      src={article.urlToImage}
                      alt={article.title}
                    />
                  )}
                  <a
                    className="text-blue-500 hover:underline mt-2 block"
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-purple-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * articlesPerPage >= articles.length}
            className={`px-4 py-2 bg-purple-500 text-white rounded ${currentPage * articlesPerPage >= articles.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
