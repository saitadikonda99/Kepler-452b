# Kepler-452b


## Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Project Structure Overview

### Front-End

The front-end is responsible for the user interface and experience, developed primarily using React with a modular component structure.

```bash
my-app/
└── src/
    ├── app/
    │   ├── layout.js               # Layout component for the application
    │   ├── favicon.ico             # Favicon for the application
    │   ├── globals.css             # Global CSS styles
    │   ├── UI/                     # UI components
    │   │   ├── home/               # Home page components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   ├── domains/            # Domain-specific components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   ├── clubs/              # Clubs page components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   ├── Faq/                # FAQ page components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   ├── news/               # News page components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   ├── socials/            # Socials page components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   ├── events/             # Events page components
    │   │   │   ├── page.jsx        
    │   │   │   └── page.css        
    │   │   │   ├── cards/          # Event cards components
    │   │   │   │   ├── Event.js    
    │   │   │   │   └── Event.css   
    │   │   ├── stats/              # Stats page components
    │   │       ├── page.jsx        
    │   │       └── page.css        
    │   ├── Components/             # Reusable components
    │   │   ├── Navbar/             # Navbar component
    │   │   │   ├── Navbar.js       
    │   │   │   └── Navbar.css      
    │   │   ├── Footer/             # Footer component
    │   │   │   ├── page.js         
    │   │   │   └── page.css        
    │   │   ├── loader/             # Loader component
    │   │       ├── loader.jsx      
    │   │       └── loader.css      
    │   ├── Clubpage/               # Club-specific pages
    │   │   ├── club/               # Specific club page component
    │   │   │   ├── page.js         
    │   │   │   └── page.css        
    │   │   ├── [ClubId]/           # Dynamic club page component
    │   │       ├── page.js         
    │   │       └── page.css        
    ├── Assets/                     # Static assets like images
    │   └── ZeroOne.JPG             
    │
    ├── lib/                        # Utility functions
    │   └── verifyJWT.ts            # JWT verification utility
```

### Back-End

The back-end handles the server-side logic, including APIs, authentication, and database management.

```bash
my-app/
└── src/
    ├── api/                        # API routes
    │   ├── clubs/                  # Clubs API
    │   │   └── route.ts            # Clubs API route
    │   ├── auth/                   # Authentication API
    │   │   ├── login/              # Login API
    │   │       └── route.ts        # Login API route
    │   ├── news/                   # News API
    │   │   ├── portrait/           # News portrait API
    │   │   │   └── route.ts        # News portrait API route
    │   │   ├── landscape/          # News landscape API
    │   │       └── route.ts        # News landscape API route
    │   ├── events/                 # Events API
    │       └── route.ts            # Events API route
    ├── config/                     # Database specific configuration
    │   ├── tables.sql              # SQL tables configuration
    │   ├── queries.sql             # SQL queries
    │   └── db.ts                   # Database configuration script

```

## Configuration Files

This project includes several configuration files that manage various aspects of the development environment, build process, and deployment. Below is a brief overview of each file:

- **`.vscode/settings.json`**  Visual Studio Code settings specific to this project.

- **`jsconfig.json`**  Configuration for JavaScript, enhancing IDE support for features like IntelliSense.

- **`.env.local`**  Local environment variables. This file is typically excluded from version control.

- **`Dockerfile`**  Instructions to build a Docker image for the application.

- **`nextjs-deployment.yaml`**  Kubernetes configuration for deploying the Next.js application.

- **`mysql-deployment.yaml`**  Kubernetes configuration for deploying a MySQL database.

- **`next.config.mjs`**  Custom settings and configurations for the Next.js framework.

- **`.gitignore`**  Specifies files and directories for Git to ignore in version control.

- **`package.json`**  Contains project dependencies, scripts, and metadata.

- **`tsconfig.json`**  TypeScript compiler options and configuration.

- **`docker-compose.yml`**  Configuration for Docker Compose to manage multi-container Docker applications.


## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/my-app.git
    cd my-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory of the project with the following content:

    ```env
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```