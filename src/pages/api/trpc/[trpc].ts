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
      return Sentry.withScope(async (scope) => {
        scope.setTag("catRequestId", input.catRequestId);
        try {
          await new Promise((res, rej) =>
            setTimeout(() => {
              if (input.shouldThrow)
                rej("Error triggered by shouldThrow in getCats");
            }, 1000)
          );
        } catch (error) {
          scope.captureException(error);
          return;
        }

        scope.captureMessage("getCats success");
        return ["Whiskers", "Mittens", "Shadow"];
      });
    }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
