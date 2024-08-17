import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Learning | Lớp học",
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
  },
};

export default function Head() {
  return (
    <>
      <title>E-Learning</title>
      <link rel="icon" href="/images/logo.jpg" />
      <link rel="shortcut icon" href="/images/logo.jpg" />
    </>
  );
}
