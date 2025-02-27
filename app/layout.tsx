import { Nunito } from "next/font/google";
import SessionProvider from "./providers/SessionProvider";
import ClientOnly from "./components/ClientOnly";
import ModalProvider from "./providers/ModalProvider"; // ✅ Import new client-side provider
import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import NavbarWithCondition from "./components/navbar/NavbarWithCondition";

export const metadata = {
  title: "Maalem",
  description: "Maalem platform",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="fr">
      <body className={font.className}>
        <SessionProvider>
          <ClientOnly>
            <ModalProvider /> {/* ✅ Moved modals into a client component */}
            <NavbarWithCondition currentUser={currentUser} />
          </ClientOnly>
          <main className="w-full pt-80">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
