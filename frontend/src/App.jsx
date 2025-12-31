import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then(res => {
        setArticles(res.data.articles || res.data);
      })
      .catch(err => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>BeyondChats Articles</h1>

      {articles.map(article => (
        <div key={article._id} style={{ marginBottom: "20px" }}>
          <h2>{article.title}</h2>
          <p>{article.content.slice(0, 200)}...</p>
          <a href={article.sourceUrl} target="_blank">Read more</a>
        </div>
      ))}
    </div>
  );
}

export default App;
