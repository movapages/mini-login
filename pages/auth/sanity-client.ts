import { createClient, type ClientConfig } from "@sanity/client";
// import sanityConfig from "@/app/studio/sanity.config";

const config: ClientConfig = {
  projectId: 'kw2t8ku9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
}

export const client = createClient(config);