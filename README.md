This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. **Set up environment variables**
   - Copy the `.env.template` file and rename it to `.env` in the root of the project.
   - Fill in the required values, for example:
     ```
     NEXT_PUBLIC_APP_NAME = 'My Store'
     NEXT_PUBLIC_APP_DESCRIPTION = 'THIS IS A DESCRIPTION'
     NEXT_PUBLIC_SERVER_URL = 'http://localhost:3000'
     LATEST_PRODUCTS_LIMIT = 4
     DATABASE_URL=""
     ```
   - Make sure to properly set the `DATABASE_URL` variable with your database connection string (PostgreSQL).

2. **Set up Prisma**
   - If you changed the `DATABASE_URL` variable, run the Prisma migration to prepare the database:
     ```bash
     npx prisma migrate dev
     ```
   - You can check the [Prisma documentation](https://www.prisma.io/docs/) for more details.

3. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. **Seed the database**

   Before running the development server, if necessary, seed the database with initial data:

   ```bash
   npm run seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
