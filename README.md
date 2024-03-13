# nestjs with authorization challenge

For the given challenge, I've chosen to use NestJS along with some dependencies:

- faker: for creating mock data
- @nestjs/config to handle configuration
- bcrypt to encode passwords
- class-transformer to exclude properties from being send in the response
- joi for simple validation of config parameters
- nest-access-control for access control 
- passport for authentication
- passport-jwt to add jwt
- passport-local to login using user and password
- typeorm as ORM
- typeorm-extension to handle seeding the database

## Setup Instructions

1. Clone the repo.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start database with docker if you want:
   ```bash
    docker-compose up db
    ```
4. Run initial migration to set up tables:
    ```bash
    docker-compose up --build
    ```
### Prerequisites

- Node.js (version xx or higher)
- Docker (version xx or higher)
- Any other dependencies

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url.git
   cd your-repository-directory