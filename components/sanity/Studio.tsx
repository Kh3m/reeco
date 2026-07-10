"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Client boundary: keeps the Sanity Studio (and its config) out of the server
// runtime, which otherwise fails during build page-data collection.
export function Studio() {
  return <NextStudio config={config} />;
}
