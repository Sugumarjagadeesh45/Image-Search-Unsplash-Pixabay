import React, { useState } from 'react';
import '../css/index.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [unsplashResults, setUnsplashResults] = useState([]);
  const [pixabayResults, setPixabayResults] = useState([]);

  const unsplashKey = "Oa-pcYG-t1Szdq-Jo_nq9eeTNIjZ4JVDkcUftrdqGz4";
  const pixabayKey = "49981535-f7e4bf6f80204b589c035f6c6";

  const handleSearch = async () => {
    if (query.trim() === '') {
      alert("Please enter a search term");
      return;
    }

    setUnsplashResults([]);
    setPixabayResults([]);

    // Unsplash API
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&client_id=${unsplashKey}`;
    const unsplashResponse = await fetch(unsplashURL);
    const unsplashData = await unsplashResponse.json();
    setUnsplashResults(unsplashData.results || []);

    // Pixabay API
    const pixabayURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10`;
    const pixabayResponse = await fetch(pixabayURL);
    const pixabayData = await pixabayResponse.json();
    setPixabayResults(pixabayData.hits || []);
  };

  return (
    <div className="app">
      <h1>Image Search: Unsplash & Pixabay</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter keyword"
      />
      <button onClick={handleSearch}>Search</button>

      <div className="container">
        <div className="column">
          <h2>Unsplash Images</h2>
          <div className="results">
            {unsplashResults.length > 0 ? (
              unsplashResults.map((item) => (
                <div className="item" key={item.id}>
                  <img src={item.urls.small} alt={item.alt_description} />
                  <a href={item.links.html} target="_blank" rel="noopener noreferrer">
                    View on Unsplash
                  </a>
                </div>
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
        </div>

        <div className="column">
          <h2>Pixabay Images</h2>
          <div className="results">
            {pixabayResults.length > 0 ? (
              pixabayResults.map((item) => (
                <div className="item" key={item.id}>
                  <img src={item.previewURL} alt={item.tags} />
                  <a href={item.pageURL} target="_blank" rel="noopener noreferrer">
                    View on Pixabay
                  </a>
                </div>
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
