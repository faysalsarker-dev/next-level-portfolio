import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import SmoothScroll from "@/components/shared/SmoothScroll";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
    <SmoothScroll />
      <main className="min-h-dvh">{children}</main>
    <Footer/>
    </>
  );
}