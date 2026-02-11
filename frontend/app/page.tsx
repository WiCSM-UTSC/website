import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">Local Test</h1>
        <p>Testing Navbar & Footer responsiveness.</p>
      </main>

      <Footer />
    </>
  );
}
