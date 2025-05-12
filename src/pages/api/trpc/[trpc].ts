/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { publicProcedure, router } from "~/server/trpc";

const appRouter = router({
  getCats: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ["Whiskers", "Mittens", "Shadow"];
  }),
  getDogs: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ["Rover", "Fido", "Spot"];
  }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
