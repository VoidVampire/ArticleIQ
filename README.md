# ArticleIQ 🧠

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/LangChain-121D33?style=for-the-badge&logo=chainlink&logoColor=white" alt="LangChain">
  <img src="https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSockets">
</div>



## 📑 Overview

ArticleIQ is an AI-driven platform that transforms how you interact with online articles. It provides instant summaries, discovers related content through intelligent web crawling, and offers an interactive AI assistant for deep article exploration—all in one seamless interface. Available both as a web application and a Chrome extension!

### 🎯 Problem 

When reading articles online, we often need to:
1. Quickly understand the main points without reading everything
2. Find related content to explore the topic further
3. Ask specific questions about the article's content

ArticleIQ solves these challenges by providing all three solutions in a single platform.

## ✨ Features

### 🔍 Instant Article Analysis
- Enter any article URL and get immediate processing
- Clean extraction of relevant content from complex web pages

### 📝 Smart Summarization
- AI-powered summaries that capture key points and insights
- Text chunking for efficient processing of long articles

### 🌐 Intelligent Web Crawling
- Automated discovery of semantically related content
- Relevance-based ranking of related articles
- Advanced TF-IDF similarity matching

### 💬 Interactive AI Assistant
- Contextual question-answering based on article content
- Real-time conversation via WebSockets
- Powered by LangChain and RAG (Retrieval-Augmented Generation)

## 🖥️ Tech Stack
### Web Application
#### Frontend
- **Next.js & React**: For a responsive, server-side rendered UI
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: For elegant, utility-first styling
- **WebSockets**: For real-time communication with the AI assistant

#### Backend
- **Python**: Core language for backend services
- **Quart**: Asynchronous web framework compatible with Flask
- **LangChain**: For RAG-based conversational AI
- **BeautifulSoup**: For HTML parsing and content extraction
- **Scikit-learn**: For TF-IDF vectorization and similarity calculations
- **NLTK**: For natural language processing tasks
- **Transformers**: For advanced text summarization with T5


### Chrome Extension
#### Frontend
  - **HTML/CSS/JavaScript**: For extension popup interface
  - **Chrome Extension APIs**: For tab interaction and content script communication
  
#### Backend
  - **Python server**: Shared with the web application for processing requests
  - **Local storage**: For caching article summaries

## 🚀 How It Works
### Web Application
### 1. Article Processing
When a user submits an article URL, ArticleIQ:
- Fetches the HTML content
- Extracts relevant text using BeautifulSoup
- Cleans and preprocesses the content

### 2. Parallel Processing
Two operations occur simultaneously:
- **Summarization**: Using the T5 transformer model to generate concise summaries
- **Web Crawling**: Using TF-IDF and cosine similarity to find related content

### 3. Interactive Exploration
Once processing is complete:
- Summary is displayed in the summary panel
- Related links are populated in the related articles section
- AI assistant becomes available for questions about the article

### Chrome Extension
1. **In-context Analysis**
   - Navigate to any article page
   - Click the ArticleIQ extension icon
   - Choose to generate a summary, find relevant links, or both

2. **Cached Results**
   - Previously analyzed pages are cached for faster access
   - Results are stored locally in the browser
## 🛠️ Architecture

```
ArticleIQ/
├── backend/
│   ├── server.py          # Main server with API endpoints and WebSockets
│   ├── webCrawler.py      # Web crawling and content similarity engine
│   ├── chatAI.py          # LangChain RAG implementation for Q&A
│   └── requirements.txt   # Python dependencies
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx       # Main application page
│   │   ├── layout.tsx     # Application layout
│   │   ├── components/
│   │   │   ├── Chatbot.tsx        # AI assistant component
│   │   │   ├── InputSection.tsx   # URL input component
│   │   │   ├── RelatedLinks.tsx   # Related articles component
│   │   │   ├── Summary.tsx        # Article summary component
│   ├── lib/
│   │   ├── api.ts         # API client for backend communication
│   │   └── types.ts       # TypeScript type definitions
├── chrome-extension/
│   ├── manifest.json      # Extension configuration
│   ├── popup.html         # Extension popup UI
│   ├── popup.js           # Popup functionality
│   ├── background.js      # Background service worker
│   ├── content.js         # Content script for page interaction
│   ├── styles.css         # Extension styling
│   └── assets/            # Icons and images
```

## 🔍 More Technical Info

### Server Architecture
The backend runs on **Quart**, an asynchronous Flask-like framework that enables handling multiple concurrent requests. It utilizes:

- **Hypercorn** for ASGI server implementation with customized configurations for handling long-running tasks
- **Server-Sent Events (SSE)** for real-time streaming of results
- **WebSockets** for bi-directional communication with the chatbot

### Article Processing Pipeline
1. **Content Extraction**:
   - BeautifulSoup for parsing and extracting article content
   - Smart element selection targeting main content areas (`<article>`, `<main>`, etc.)
   - Noise removal (navigation, footers, etc.)

2. **Text Processing**:
   - NLTK for sentence tokenization and natural language preprocessing
   - Text chunking to handle long articles exceeding model context windows

3. **Summarization Engine**:
   - Leverages the `pszemraj/long-t5-tglobal-base-16384-book-summary` model
   - Processes text in chunks using `ProcessPoolExecutor` for parallel processing
   - Dynamically adjusts chunk size based on model capabilities
   - Post-processes summaries for consistency

### Web Crawler System
The `RelevantWebCrawler` class implements a sophisticated crawling system:

- **Concurrency Management**:
  - Asynchronous crawling with `aiohttp` for efficient network operations
  - Semaphore-based concurrency control (configurable)
  - Exponential backoff retry mechanism for temporary failures

- **Content Relevance Analysis**:
  - TF-IDF vectorization for semantic representation of content
  - Cosine similarity calculation between original and discovered content
  - Configurable similarity threshold for relevance filtering
  - Smart domain limiting to prevent over-crawling a single site

- **Search Optimization**:
  - Integration with Google Search API for initial seed URLs
  - Keyword extraction using KeyBERT to generate effective search queries
  - Domain filtering to exclude non-article sources (social media, etc.)

### RAG-Powered Chatbot
The chatbot leverages LangChain's RAG (Retrieval Augmented Generation) capabilities:

- **Vector Store**:
  - In-memory vector database using Cohere embeddings (`embed-english-v3.0`)
  - Document chunking with `RecursiveCharacterTextSplitter` for efficient storage

- **Conversational Memory**:
  - Maintains conversation history with `ConversationBufferMemory`
  - Contextual question answering based on previous interactions

- **LLM Integration**:
  - Uses Cohere's `command-r-plus` model for responses
  - Custom prompting to focus on article-specific information
  - Real-time streaming responses through WebSockets


### Chrome Extension
The extension leverages Chrome's Extension API to:

- **Extract Page Content**:
  - Content scripts access the DOM to extract HTML
  - Background script communicates with the Python backend

- **Process and Display**:
  - Sends extracted content to the same backend used by the web app
  - Displays summaries and related links in a clean popup interface
  - Caches results for previously visited pages


## ⚙️ Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/VoidVampire/ArticleIQ.git
cd ArticleIQ/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables for API keys
export COHERE_API_KEY="your_cohere_api_key"  # Required for the chatbot
export LANGCHAIN_TRACING_V2="true"  # Optional for debugging

# Start the server
python server.py
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Chrome Extension Setup
```bash
# In Chrome, navigate to chrome://extensions/
# Enable "Developer mode"
# Click "Load unpacked"
# Select the chrome-extension directory
```

## 🖱️ Usage

### Web Application
1. Open your browser and navigate to `http://localhost:3000`
2. Enter the URL of an article you want to analyze
3. Click "Analyze Article" and wait for processing to complete
4. Explore the summary and related articles
5. Ask questions about the article in the AI assistant panel

### Chrome Extension
1. Navigate to any article page you want to analyze
2. Click the ArticleIQ extension icon in your browser toolbar
3. Click "Generate Both" for complete analysis, or choose specific features
4. View the summary and related links in the popup

## ⚠️ Performance Notes

- **CPU Processing**: The system is currently optimized for CPU processing, which may result in slower processing times for large articles. For production use, GPU acceleration is recommended.
- **API Limitations**: The current implementation uses Cohere's free tier API, which may affect the quality and speed of RAG responses. For optimal performance, consider upgrading to a paid tier or using alternative high-performance language models.
- **Extension vs Web App**: The Chrome extension provides convenient in-context analysis but has a more streamlined feature set compared to the full web application. The web app includes the AI assistant feature which is not available in the extension.



## 📊 Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/uFFhW8tb8XI?si=cLGBGI7ua2U1a9f-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


