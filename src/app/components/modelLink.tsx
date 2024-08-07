import { useState } from "react";

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}
const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Chèn link"
          className="border p-2 mb-2 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSubmit(url);
              setUrl("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Ok
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};
export default LinkModal;
