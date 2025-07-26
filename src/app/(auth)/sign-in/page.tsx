import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-muted-foreground">
          Accede a tu cuenta para continuar
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
