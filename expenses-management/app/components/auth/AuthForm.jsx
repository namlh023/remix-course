import {
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
} from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const authMode = searchParams.get("mode") || "login";
  const validationErrors = useActionData();

  const submitBtnCaption = authMode === "login" ? "Login" : "Signup";
  const toggleBtnCaption =
    authMode === "login" ? "Create a new user" : "Login with existing user";

  const isSubmitting = navigation.state !== "idle";

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img"></div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : submitBtnCaption}
        </button>
        <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
          {toggleBtnCaption}
        </Link>
      </div>
    </form>
  );
}

export default AuthForm;
