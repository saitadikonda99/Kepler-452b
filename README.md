# Kepler-452b


## Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## Key Features

- **Club Management System**: Comprehensive club registration, management, and statistics tracking
- **User Authentication**: Secure login/logout with JWT-based authentication and session management
- **Role-Based Access Control**: Different dashboards for students, club leads, and administrators
- **File Upload Management**: CSV file upload functionality for activities, members, and other data
- **Statistics Dashboard**: Real-time statistics and analytics with interactive charts
- **Mentorship Program**: Dedicated mentors section with profile management
- **Event Management**: Event creation, management, and display system
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Email Integration**: Automated email services for notifications and communications
- **Redis Caching**: Performance optimization with Redis integration

## Project Structure Overview

### Front-End

The front-end is responsible for the user interface and experience, developed primarily using React with Next.js App Router and a modular component structure.

```bash
my-app/
└── src/
    ├── app/
    │   ├── layout.js               # Layout component for the application
    │   ├── page.js                 # Main page component
    │   ├── _app.js                 # Custom app component
    │   ├── favicon.ico             # Favicon for the application
    │   ├── globals.css             # Global CSS styles
    │   ├── UI/                     # UI components
    │   │   ├── home/               # Home page components
    │   │   ├── domains/            # Domain-specific components
    │   │   ├── clubs/              # Clubs page components
    │   │   ├── Faq/                # FAQ page components
    │   │   ├── news/               # News page components
    │   │   ├── socials/            # Social media page components
    │   │   ├── events/             # Events page components
    │   │   ├── stats/              # Statistics page components
    │   │   ├── Team/               # Team page components
    │   │   ├── partners/           # Partners page components
    │   │   └── testimonials/       # Testimonials page components
    │   ├── (pages)/                # Page routes using Next.js App Router
    │   │   ├── activities/         # Activities management pages
    │   │   ├── admin/              # Admin dashboard pages
    │   │   ├── auth/               # Authentication pages
    │   │   ├── clubRegistration/   # Club registration pages
    │   │   ├── components/         # Shared page components
    │   │   ├── lead/               # Club lead dashboard pages
    │   │   ├── mail-service/       # Email service pages
    │   │   ├── mentors/            # Mentors listing pages
    │   │   ├── organogram/         # Organization chart pages
    │   │   ├── student/            # Student dashboard pages
    │   │   └── team/               # Team management pages
    │   ├── Components/             # Reusable components
    │   │   ├── Navbar/             # Navigation bar component
    │   │   ├── Footer/             # Footer component
    │   │   ├── Pagination/         # Pagination component
    │   │   ├── loader/             # Loader component
    │   │   └── ui/                 # UI utility components
    │   │       └── dropZone.tsx    # File upload dropzone component
    │   ├── Clubpage/               # Club-specific pages
    │   │   ├── club/               # Specific club page component
    │   │   └── [ClubId]/           # Dynamic club page component
    │   ├── Assets/                 # Static assets like images
    │   ├── animation/              # Animation components
    │   └── api/                    # API routes (see Back-End section)
    ├── config/                     # Configuration files
    ├── data/                       # Data files and utilities
    ├── lib/                        # Utility functions
    ├── middleware.ts               # Next.js middleware
    └── middleware/                 # Additional middleware
```

### Back-End

The back-end handles the server-side logic, including APIs, authentication, database management, and file operations using Next.js API routes.

```bash
my-app/src/app/api/
├── academicYears/              # Academic years management API
├── activities/                 # Activities management API
├── admin/                      # Admin-specific API endpoints
├── auth/                       # Authentication API
├── changePassword/             # Password change API
├── clubData/                   # Club data management API
├── clubRegistration/           # Club registration API
├── clubUpdate/                 # Club update operations API
├── courses/                    # Courses management API
├── getClubs/                   # Retrieve clubs API
├── getCourses/                 # Retrieve courses API
├── lead/                       # Club lead management API
├── logout/                     # User logout API
├── manageSessions/             # Session management API
├── overAllStats/               # Overall statistics API
├── projects/                   # Projects management API
├── stats/                      # Statistics API
├── student/                    # Student-specific API endpoints
└── users/                      # User management API

config/                         # Database and configuration files
├── tables.sql                  # SQL tables configuration
├── queries.sql                 # SQL queries
└── db.ts                       # Database configuration script
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
    git clone https://github.com/saitadikonda99/Kepler-452b.git
    cd Kepler-452b/my-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the my-app directory with the following content:

    ```env
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REDIS_URL=your_redis_connection_string
    EMAIL_USER=your_email_service_user
    EMAIL_PASS=your_email_service_password
    ```

4. **Set up the database:**

    Import the SQL configuration files from the `src/config/` directory to set up your MySQL database tables and initial data.

5. **Run the development server:**

    ```bash
    npm run dev
    ```

6. **Build for production:**

    ```bash
    npm run build
    npm start
    ```

## Docker Setup

This project includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -t kepler-452b .
docker run -p 3000:3000 kepler-452b
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality