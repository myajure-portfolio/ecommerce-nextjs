import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { auth } from '@/auth';
import { getCart } from '@/actions/cart/get-cart';

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const cart = await getCart();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header session={session} cart={cart as any} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
