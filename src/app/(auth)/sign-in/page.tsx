import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { auth } from "@/auth";

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) return redirect(callbackUrl || "/");

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
        <p className="text-muted-foreground">Access your account to continue</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default SignInPage;
