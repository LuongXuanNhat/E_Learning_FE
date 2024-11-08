import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Learning | Kho tài liệu",
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
