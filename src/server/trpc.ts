/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v11/router
 * @see https://trpc.io/docs/v11/procedures
 */
import { initTRPC } from "@trpc/server";
import { transformer } from "../utils/transformer";
import * as Sentry from "@sentry/nextjs";

const t = initTRPC.create({
  transformer,
});

const sentryMiddleware = t.middleware(
  Sentry.trpcMiddleware({
    attachRpcInput: true,
  })
);

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure.use(sentryMiddleware);

export const router = t.router;
