import { BlogPostFields } from "@/types/contentful.types";
import { createClient } from "contentful";

export const client = createClient({
  space: "2t4dbw4pebzf",
  accessToken: "qPvZd4nlweW9WYjksH4pyMC_QhzJPG-0klcIOb_IIkQ",
  environment: "master",
});

// async function fetchContentTypes() {
//   const space = await client.getSpace(`"${process.env.CONTENTFUL_SPACE_ID}"`);
//   const environment = await space.getEnvironment("master");
//   const contentTypes = await environment.getContentTypes();

//   console.log(JSON.stringify(contentTypes.items, null, 2));
// }

// fetchContentTypes().catch(console.error);
