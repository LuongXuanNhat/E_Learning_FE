import { Button } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="w-full h-full min-h-[700px] flex justify-center items-center ">
      <Button variant="text" loading={true}>
        Đang tải
      </Button>
    </div>
  );
}
