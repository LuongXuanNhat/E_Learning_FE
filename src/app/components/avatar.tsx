import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AvatarSelector = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<string[]>([]);
  const router = useRouter();

  // Load all avatars from the 'public/avatar' folder
  useEffect(() => {
    const avatarImages = [
      "/avatar/av0.jpg",
      "/avatar/av1.jpg",
      "/avatar/av2.jpg",
      "/avatar/av3.jpg",
      "/avatar/av4.jpg",
      "/avatar/av5.jpg",
      "/avatar/av6.jpg",
      "/avatar/av7.jpg",
      "/avatar/av8.jpg",
      "/avatar/av9.jpg",
      "/avatar/av10.jpg",
      "/avatar/av11.jpg",
      "/avatar/av12.jpg",
    ];
    setAvatars(avatarImages);

    // Retrieve previously selected avatar from localStorage
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
  }, []);

  const handleAvatarClick = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    localStorage.setItem("avatar", avatarUrl);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`rounded-full border-4 ${
            selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
          } p-1 cursor-pointer transition duration-300 ease-in-out`}
          onClick={() => handleAvatarClick(avatar)}
        >
          <Image
            src={avatar}
            alt={`Avatar ${index + 1}`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        </div>
      ))}
      <div className="w-full text-center mb-2">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => router.refresh()}
        >
          Lưu avatar
        </button>
      </div>
    </div>
  );
};

export default AvatarSelector;
