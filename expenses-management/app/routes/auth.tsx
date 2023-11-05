import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";
import { validateCredentials } from "~/data/validation.server";
import { signup, login } from "~/data/auth.server";

export default function AuthPage() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials: any = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    console.log(error);
    return error;
  }

  if (authMode === "login") {
    return await login(credentials);
  } else {
    return await signup(credentials);
  }
}
