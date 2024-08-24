# Contacts Application

This application is a simple contact list manager built using Next.js, Prisma, and PostgreSQL. The app allows users to add, edit, and delete contacts. It's fully responsive and designed to work seamlessly across devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed (preferably version 14 or later).
- **npm**: Ensure npm is installed (comes with Node.js).
- **PostgreSQL**: You need a PostgreSQL database instance.

## Installation

1. **Clone the repository:**

   \`\`\`bash
   git clone <repository-url>
   cd <repository-directory>
   \`\`\`

2. **Install dependencies:**

   Navigate to the root directory of the project and run:

   \`\`\`bash
   npm install
   \`\`\`

3. **Migrate the database:**

   Once your `.env` file is configured, run the following command to apply the Prisma migrations and sync your database schema:

   \`\`\`bash
   npx prisma migrate dev
   \`\`\`

   If you're deploying to a production environment, use the following command instead:

   \`\`\`bash
   npx prisma migrate deploy
   \`\`\`

4. **Generate Prisma Client:**

   After migrating, generate the Prisma client:

   \`\`\`bash
   npx prisma generate
   \`\`\`

## Running the Application

Once you've set up the environment and database, you can run the application locally.

1. **Start the development server:**

   \`\`\`bash
   npm run dev
   \`\`\`

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy the application:

1. Ensure all environment variables are properly configured in your deployment environment.
2. Run migrations in your production database using:

   \`\`\`bash
   npx prisma migrate deploy
   \`\`\`

3. Deploy your application using your preferred platform (e.g., Vercel, Heroku).

## Important Notes

- Make sure to keep your `.env` file secure and avoid pushing it to version control.
- For any issues with migrations, you can reset the migrations directory and start fresh:

  \`\`\`bash
  rm -rf prisma/migrations
  npx prisma migrate dev
  \`\`\`

## Contact

If you have any questions or run into issues, feel free to reach out via the issue tracker on the repository.

---

**Happy coding!** 🚀
