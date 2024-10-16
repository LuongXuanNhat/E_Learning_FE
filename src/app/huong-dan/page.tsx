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
    <div>
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
                Hướng dẫn học viên cách sử dụng chức năng đăng ký học phần của
                hệ thống & nhiều hơn thế nữa...
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography as="a" href="#q1">
                <Button className="bg-pink-600">Xem</Button>
              </Typography>
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
                Hướng dẫn học viên cách sử dụng chức năng đăng ký học phần của
                hệ thống & nhiều hơn thế nữa...
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography as="a" href="#q2">
                <Button className="bg-pink-600">Xem</Button>
              </Typography>
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
                Hướng dẫn học viên cách sử dụng chức năng đăng ký học phần của
                hệ thống & nhiều hơn thế nữa...
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography as="a" href="#q3">
                <Button className="bg-pink-600">Xem</Button>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="container mt-20 bg-white">
        <ul>
          <li id="q1">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Cách đăng ký học phần
            </Typography>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-gray-700 leading-relaxed">
              <div className="text-lg font-semibold text-blue-600">Bước 1:</div>
              <p>
                Học viên truy cập vào hệ thống học tập online và thực hiện đăng
                nhập tài khoản để có quyền đăng ký học phần
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 2:</div>
              <p>
                Học viên truy cập chức năng <strong>Đăng ký học phần</strong>{" "}
                trên thanh navbar
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 3:</div>
              <p>
                Tại giao diện danh sách các học phần đang mở, học viên cần tìm
                kiếm các học phần cần học và thực hiện đăng ký bằng cách click
                vào nút đăng ký học phần bên phải học phần đó
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 4:</div>
              <p>
                Kiểm tra xem bạn đã đăng ký học phần chưa bằng cách click vào
                tab
                <span className="font-semibold italic">
                  {" "}
                  Danh sách học phần đã đăng ký{" "}
                </span>
                để theo dõi
              </p>

              <p className="text-green-600 font-medium">
                Chúc các bạn học tập thật tốt
              </p>
            </div>
          </li>
          <li id="q2" className="mt-10">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Hướng dẫn sử dụng chức năng đánh giá lớp học
            </Typography>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-gray-700 leading-relaxed">
              <p className="my-3">
                Chức năng đánh giá lớp học được mở dành riêng cho học viên sử
                dụng để đánh giá lớp học mà học viên đã và đang học: Khi bạn cảm
                thấy vấn đề gì trong giảng dạy, ví dụ như buổi học không tốt,
                giảng viên không tập trung dạy hoặc ... thì học viên có thể cân
                nhắc và phản ánh kịp thời lên đây. Cố vấn học tập của lớp sẽ
                theo dõi và đồng hành cũng các bạn để giải quyết những khó khăn
                của học viên!
              </p>
              <div className="text-lg font-semibold text-blue-600">Bước 1:</div>
              <p>
                Học viên truy cập vào hệ thống học tập online và thực hiện đăng
                nhập tài khoản để có quyền đăng ký học phần
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 2:</div>
              <p>
                Học viên truy cập <strong>vào lớp học</strong> cần đánh giá, và
                bạn chọn đến tab <strong>Đánh giá lớp học</strong>
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 3:</div>
              <p>
                Tại giao diện đánh giá lớp học. Học viên có thể xem các đánh giá
                trước đó và đồng thời thực hiện đánh giá.
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 4:</div>
              <p>
                Hãy lưu ý là khi đã đánh giá học viên sẽ không được xóa đánh giá
                nữa!
              </p>

              <p className="text-green-600 font-medium">
                Chúc các bạn học tập thật tốt
              </p>
            </div>
          </li>
          <li id="q3" className="mt-10">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Cách đăng ký học phần
            </Typography>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-gray-700 leading-relaxed">
              <div className="text-lg font-semibold text-blue-600">Bước 1:</div>
              <p>
                Học viên truy cập vào hệ thống học tập online và thực hiện đăng
                nhập tài khoản để có quyền đăng ký học phần
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 2:</div>
              <p>
                Học viên truy cập <strong>vào lớp học</strong> cần đánh giá, và
                bạn chọn đến tab <strong>Phòng trao đổi</strong>
              </p>

              <div className="text-lg font-semibold text-blue-600">Bước 3:</div>
              <p>
                Tại giao diện hội thoại nhóm. Học viên chat với giảng viên hoặc
                các học viên khác!
              </p>

              <p className="text-green-600 font-medium">
                Chúc các bạn học tập thật tốt
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
