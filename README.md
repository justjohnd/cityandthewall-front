Basic configuration from here: 
https://vercel.com/guides/nextjs-prisma-postgres
https://www.makeuseof.com/postgresql-connect-nextjs-application-using-prisma/

- Install next app `npx create-next-app <app-name>`
- Install prisma client
- Create schema.prisma exactly as it is on the backend
- Attempt to push to db: `npx prisma db push`
- Generate prisma client: `npx prisma db push`
- Create lib/prisma.ts
- Move page.tsx from /app to /pages and rename index.tsx
- Move layout.tsx into components, favicon.ico into root, and globals.css to /styles. Then delete /app
- **Removed** createdAt, updatedAt properties from prisma.schema due to error (need to fix)
- Add getStaticProps to index.tsx and console.log for test to get all items
- Stop server, run `npx prisma generate` then start server again

## Glossary
ReactNode: https://dev.to/elhamnajeebullah/react-typescript-what-is-reactnode-and-when-to-use-it-3660#:~:text=In%20ReactJS%20with%20TypeScript%2C%20ReactNode,hold%20any%20of%20these%20types
jsx: https://nextjs.org/blog/styling-next-with-styled-jsx
React.FC<...>: https://dev.to/elhamnajeebullah/react-typescript-what-is-reactfc-and-why-should-i-use-it-4029
Image sizing: https://nextjs.org/docs/app/building-your-application/optimizing/images#image-sizing
next-auth, SessionProvider: https://next-auth.js.org/getting-started/example
useSession(): https://next-auth.js.org/getting-started/client#usesession
_app.tsx: https://nextjs.org/docs/pages/building-your-application/routing/custom-app
Routing: https://nextjs.org/docs/pages/building-your-application/routing
useRouter: https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
data- attribute: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes


## File structure and notes
### lib/prisma.ts
- This file instantiates a client object for the Prisma ORM and connects the front end to the back end.  
- Setting prisma to global.prisma is only done for development, or order to prevent to many sessions from being opened at the same time
- `global` is the Node.js global object. 
- globalWithPrisma is set equal to global, but given the types of both globalThis and prisma
Refs: 
https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution
globalThis: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

###
prisma/schema.prisma
To update the file, make your changes, then stop to front and backend browsers. Run `npx prisma generate`, then start both servers again.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
