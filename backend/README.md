# Bike Rental Backend

## Setup Instructions

1. Install MySQL Server if not already installed
2. Create a new database and tables:
   ```bash
   mysql -u root -p < models/schema.sql
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Update database configuration in `config/database.js` if needed
5. Start the server:
   ```bash
   npm start
   ```

## Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password
- role (user/admin)
- created_at

### Bikes Table
- id (Primary Key)
- name
- description
- price
- image_url
- available
- created_at

### Rentals Table
- id (Primary Key)
- bike_id (Foreign Key)
- user_id (Foreign Key)
- start_date
- end_date
- total_price
- status (pending/approved/rejected)
- created_at