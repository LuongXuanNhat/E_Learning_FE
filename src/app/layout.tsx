import { roboto } from "./lib/font";
import "./globals.css";
import { StickyNavbar } from "./components/navbar";
import Footer from "./components/footer";
import { AlertProvider } from "./components/Alert/alertbase";
import { ShowAlert } from "./components/Alert/alert";
import { AlertCustom } from "./components/Alert/arlertcustom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AlertProvider>
          <StickyNavbar />
          <div className="bg-white">
            {/* THÔNG BÁO */}
            <AlertCustom />
            <div className="container mx-auto ">{children}</div>
          </div>
        </AlertProvider>
        <Footer />
      </body>
    </html>
  );
}
