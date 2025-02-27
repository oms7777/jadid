import { Nunito } from "next/font/google";
import SessionProvider from "./providers/SessionProvider";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SearchModal from "./components/modals/SearchModal";
import RentModal from "./components/modals/RentModal"; // Import the new component
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
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />

            {/* Use the NavbarWithCondition component */}
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
