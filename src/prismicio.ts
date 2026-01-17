import {
  createClient as baseCreateClient,
  ClientConfig,
  Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * The project's Prismic route resolvers. This list determines a Prismic document's URL.
 */
const routes: Route[] = [
  { type: "page", uid: "home", path: "/" },
  { type: "page", path: "/:uid" },
  { type: "case_study", path: "/case-studies/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export function createClient(config: ClientConfig = {}) {
  const client = baseCreateClient(sm.apiEndpoint || repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? ({ next: { tags: ["prismic"], revalidate: 60 } } as any)
        : ({ next: { revalidate: 5 } } as any),
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
