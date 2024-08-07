import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Learning",
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
  },
};

export default function Page() {
  return (
    <div>
      <img
        className="object-cover object-center w-full h-[760px]"
        src="images/bia2.jpg"
        alt="nature image"
      />
    </div>
  );
}
