import { auth } from "@/auth";
import { Header, Footer } from "@/components";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await auth();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
