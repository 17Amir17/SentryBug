/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { publicProcedure, router } from "~/server/trpc";
import * as Sentry from "@sentry/nextjs";
import * as z from "zod";

const appRouter = router({
  getCats: publicProcedure
    .input(
      z.object({
        shouldThrow: z.boolean().optional(),
        catRequestId: z.string(),
      })
    )
    .query(async ({ input }) => {
      Sentry.setTag("catRequestId", input.catRequestId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (input.shouldThrow) {
        throw new Error("Error triggered by shouldThrow in getCats");
      }
      return ["Whiskers", "Mittens", "Shadow"];
    }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
