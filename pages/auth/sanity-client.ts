import { createClient, type ClientConfig } from "@sanity/client";
// import {mockProviders} from "next-auth/client/__tests__/helpers/mocks";
// import credentials = mockProviders.credentials;
// import sanityConfig from "@/app/studio/sanity.config";

const config: ClientConfig = {
  projectId: 'kw2t8ku9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
  token: 'skDKsbmhYJAJs8emxC3hzywKUuQJ91R6l18ay3kYigL62Yb4M2KMnJlRSGA11s4Ju9jwLmTGVT4twMqv',
}

export const client = createClient(config);