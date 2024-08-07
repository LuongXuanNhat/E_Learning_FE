"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Ultis() {
  return (
    <div className="row flex flex-wrap-reverse py-20 justify-around">
      <div className="col">
        <Card className="mt-6 w-96">
          <CardHeader color="blue-gray" className="relative h-56">
            <img src="/images/hd-1.jpg" alt="card-image" />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Cách đăng ký học phần
            </Typography>
            <Typography>
              Hướng dẫn học viên cách sử dụng chức năng đăng ký học phần của hệ
              thống & nhiều hơn thế nữa...
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-pink-600">Xem video</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="col">
        <Card className="mt-6 w-96">
          <CardHeader color="blue-gray" className="relative h-56">
            <img src="/images/hd-1.jpg" alt="card-image" />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Hướng dẫn sử dụng chức năng đánh giá lớp học
            </Typography>
            <Typography>
              Hướng dẫn học viên cách sử dụng chức năng đăng ký học phần của hệ
              thống & nhiều hơn thế nữa...
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-pink-600">Xem video</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="col">
        <Card className="mt-6 w-96">
          <CardHeader color="blue-gray" className="relative h-56">
            <img src="/images/hd-1.jpg" alt="card-image" />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Trao đổi học tập với chat nhóm
            </Typography>
            <Typography>
              Hướng dẫn học viên cách sử dụng chức năng đăng ký học phần của hệ
              thống & nhiều hơn thế nữa...
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-pink-600">Xem video</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
