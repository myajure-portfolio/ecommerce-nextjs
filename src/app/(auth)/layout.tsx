import { auth } from '@/auth';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import type { Session as NextAuthSession } from 'next-auth';
import type { Cart } from '@/interfaces';

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      <Header session={session as NextAuthSession | null} cart={undefined} />
      <main className="container mx-auto px-4 py-16">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
