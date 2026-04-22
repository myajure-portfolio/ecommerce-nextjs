import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { auth } from '@/auth';

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header session={session} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
