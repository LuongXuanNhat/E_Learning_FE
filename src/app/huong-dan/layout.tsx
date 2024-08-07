import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Learning | Hướng dẫn sử dụng website",
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
