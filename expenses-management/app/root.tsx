import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
  useMatches,
} from "@remix-run/react";
import shareStyled from "~/styles/shared.css";
import ErrorElement from "~/components/util/Error";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: shareStyled },
];

function Document({ title, children }) {
  const matches = useMatches();
  const disableJS = matches.some((match) => (match as any).handle?.disableJS);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document title="YES">
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <main>
          <ErrorElement title={error.statusText}>
            <p>{error.data?.message || "Something went wrong. Try again."}</p>
            <p>
              Back to <Link to="/">Safety</Link>
            </p>
          </ErrorElement>
        </main>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document title="An error occurred">
        <main>
          <ErrorElement title="An error occurred">
            <p>{error.message || "Something went wrong. Try again."}</p>
            <p>
              Back to <Link to="/">Safety</Link>
            </p>
          </ErrorElement>
        </main>
      </Document>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
