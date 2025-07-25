import { Header, Footer } from '@/components';



const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;