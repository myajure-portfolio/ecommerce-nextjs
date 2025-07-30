import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignUpForm } from "./SignUpForm";

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) return redirect(callbackUrl || "/");

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Sign Up</h1>
        <p className="text-muted-foreground">Create your account to continue</p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
