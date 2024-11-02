import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Learning | Thêm mới khoa/viện",
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
