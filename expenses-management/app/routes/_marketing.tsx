import { Outlet } from "@remix-run/react";
import { getUserFromSession } from "~/data/auth.server";
import MainHeader from "~/components/navigation/MainHeader";
import marketingStyles from "~/styles/marketing.css";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}
