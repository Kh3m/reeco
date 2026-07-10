import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// `projectId` falls back to a syntactically-valid placeholder so the client
// can be constructed before a real Sanity project is configured. The fetch
// layer (sanity/fetch.ts) guards against actually calling the API until
// `isSanityConfigured` is true.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true, // published, cached content — fine for a public marketing site
});
