/**
 * This is a Next.js page.
 */
import React from "react";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const utils = trpc.useUtils();
  const fetchBothCats = () => {
    utils.getCats.fetch({ shouldThrow: false, catRequestId: "123" });
    utils.getCats.fetch({ shouldThrow: false, catRequestId: "456" });
  };

  const throwErrorBoth = () => {
    utils.getCats.fetch({ shouldThrow: true, catRequestId: "123" });
    utils.getCats.fetch({ shouldThrow: true, catRequestId: "456" });
  };

  return (
    <div>
      <button onClick={fetchBothCats}>Fetch</button>
      <button onClick={throwErrorBoth}>Throw Error</button>
    </div>
  );
}
