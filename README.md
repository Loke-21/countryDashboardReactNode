# Project Setup Instructions

# Country Data Dashboard

## Overview

This project is a web application that retrieves and displays country data from the [REST Countries API](https://restcountries.com/v3.1/all). It consists of a backend (Node.js/Express with TypeScript) providing APIs for data consumption and a frontend (React/Next.js with TypeScript) to display the information to the user.

## Requirements

- Node.js (>=16)
- npm
- React/Next.js
- TypeScript
- REST Countries API

## Setup Instructions

1.  **Clone the repository:**

    ```
    git clone https://github.com/Loke-21/reactnode-hub.git
    cd <your-repository-name>
    ```

2.  **Backend Setup:**

    ```
    cd backend
    npm install  # or yarn install
    ```

    Create a `.env` file in the backend directory if you need to specify environment variables (e.g., API keys, port).

    ```
    npm run dev  # or yarn dev
    ```

    The backend server should start at `http://localhost:<port>` (default port is 3000 or as specified in your `.env` file).

3.  **Frontend Setup:**

    ```
    cd frontend
    npm install  # or yarn install
    ```

    ```
    npm run dev  # or yarn dev
    ```

    The frontend application should start at `http://localhost:<port>` (default port is 3000 or as specified in your `.env` file).

## Usage

1.  **Access the application:** Open your browser and navigate to the frontend URL (e.g., `http://localhost:3000`).

2.  **Country List Page:**

    - Displays a list of all countries with basic information (name, flag, region).
    - Includes the current display current time of that country (12-hour format).
    - Lazy-loading and infinite scroll with batch loading are implemented.
    - Filters by region and timezone.
    - Search bar to search for countries by name.

3.  **Country Detail Page:**

    - Shows detailed information about a selected country (e.g., population, currency, languages, flag, and region).

## API Endpoints

### Backend API

- `GET /countries`: Fetch a list of all countries.
- `GET /countries/:code`: Fetch detailed information about a single country by its country code.
- `GET /countries/region/:region`: Filter countries by region.
- `GET /countries/search`: Search for a country by name, capital, region, or timezone.

  - `/countries/search?name=India`
  - `/countries/search?capital=Tokyo`
  - `/countries/search?region=Asia`
  - `/countries/search?timezone=UTC+05:30`

## Technologies Used

### Backend

- Node.js
- Express
- TypeScript

### Frontend

- React/Next.js
- TypeScript
- CSS Framework (Bootstrap, Material-UI, or Tailwind CSS)

## Evaluation Points

- **Backend:**
  - API Design
  - Caching
  - Data Processing
- **Frontend:**
  - Core Pages & Components
  - Component Design
  - State Management
  - Routing
- **Overall:**
  - Error Handling
  - Security
  - Performance
  - Code Quality
  - Documentation
  - Testing coverage and quality
  - Git commit messages and Inline documentations.
  - TypeScript Best Practices
