import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
