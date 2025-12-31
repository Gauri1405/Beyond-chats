BeyondChats – AI-Powered Article Aggregation Platform
📌 Overview

BeyondChats is a full-stack web application that aggregates articles from external sources, enriches them using LLM-based summarization, and serves them through a REST API with a React frontend.

The project demonstrates:

Backend API design with Node.js & Express

Web scraping + search integration

LLM-powered content processing

MongoDB data modeling

Clean project structure suitable for production

🏗️ Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

SerpAPI (Google Search integration)

OpenAI API (LLM summarization)

dotenv

Frontend

React (Vite)

CSS

📂 Project Structure
beyondchats-assignment/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── article.controller.js
│   │   ├── models/
│   │   │   └── article.model.js
│   │   ├── routes/
│   │   │   └── article.routes.js
│   │   ├── scripts/
│   │   │   ├── scrapeBeyondChats.js
│   │   │   ├── updateArticle.js
│   │   │   └── updateArticlesLLM.js
│   │   ├── services/
│   │   │   ├── contentScraper.js
│   │   │   ├── googleSearch.js
│   │   │   └── llm.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Environment Variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
SERPAPI_KEY=your_serpapi_key
OPENAI_API_KEY=your_openai_api_key


⚠️ Never commit .env to GitHub

🚀 Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/Gauri1405/Beyond-chats.git
cd beyondchats-assignment

2️⃣ Backend setup
cd backend
npm install

3️⃣ Start backend server
node src/server.js


Server runs on:

http://localhost:5000

4️⃣ Run data enrichment script (LLM)
node src/scripts/updateArticlesLLM.js


This script:

Fetches articles

Uses Google Search (SerpAPI)

Enhances content using OpenAI

Stores results in MongoDB

5️⃣ Frontend setup
cd ../frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔌 API Endpoints
Method	Endpoint	Description
GET	/api/articles	Fetch all articles
GET	/api/articles/:id	Fetch article by ID
🧠 Key Features

Modular backend architecture

LLM-based content enrichment

External search + scraping integration

Clean MongoDB schema design

Separation of concerns (controllers, services, scripts)

🚧 Known Limitations

MongoDB Atlas requires IP whitelisting

API keys must be configured manually

Error handling can be further improved for production

📌 Future Improvements

Authentication & user roles

Caching LLM responses

Pagination & filtering

Deployment (Docker / Cloud)

👤 Author

Gauri Yadwadkar
GitHub: https://github.com/Gauri1405
