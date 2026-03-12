import { SignInForm } from './LoginForm';

const SignInPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
        <p className="text-muted-foreground">Access your account to continue</p>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
