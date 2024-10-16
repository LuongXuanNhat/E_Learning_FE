import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const generatePlaceholderData = () => [
  {
    id: 1,
    href: "https://hvkhqs.edu.vn/thong-bao-ve-viec-to-chuc-thi-danh-gia-nang-luc-ngoai-ngu-va-cap-chung-chi-theo-khung-nang-luc-ngoai-ngu-6-bac-dung-cho-viet-nam-dot-7-nam-2024-tai-hoc-vien-khoa-hoc-quan-su/",
    title:
      "Thông báo về việc tổ chức thi đánh giá năng lực ngoại ngữ và cấp chứng chỉ theo khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam đợt 7 năm 2024 tại Học viện Khoa học Quân sự",
    date: "01/10/2024",
    image: "images/banner/a2.png",
  },
  {
    id: 2,
    href: "https://hvkhqs.edu.vn/hoc-vien-khoa-hoc-quan-su-khai-giang-cac-khoa-dao-tao-hoc-vien-quan-su-nuoc-ngoai-nam-hoc-2024-2025/",
    title:
      "Học viện Khoa học Quân sự khai giảng các khóa đào tạo học viên quân sự nước ngoài năm học 2024-2025",
    date: "30/09/2024",
    image: "images/banner/a1.jpg",
  },
  {
    id: 3,
    href: "https://hvkhqs.edu.vn/thong-bao-lich-hop-hoi-dong-danh-gia-luan-an-tien-si-cap-hoc-vien-cua-nghien-cuu-sinh-nguyen-thi-thiem/",
    title:
      "Thông báo Lịch họp Hội đồng đánh giá luận án tiến sĩ cấp Học viện của Nghiên cứu sinh Nguyễn Thị Thiêm",
    date: "30/09/2024",
    image: "images/banner/a3.jpg",
  },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const news = generatePlaceholderData();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-600 mb-6">
        Ngày hôm nay: {format(new Date(), "dd-MM-yyyy")}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
        {/* Featured News Slider */}
        <div className="md:col-span-5 relative">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src={news[currentSlide].image}
                alt={news[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <a
                className="text-white text-lg font-semibold"
                href={news[currentSlide].href}
                target="blank"
              >
                {news[currentSlide].title}
              </a>
              <p className="text-gray-300 text-sm mt-2">
                {news[currentSlide].date}
              </p>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* News List */}
        <div className="md:col-span-4">
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <a href={item.href} target="blank">
                  <h4 className="text-sm font-medium hover:text-blue-600 cursor-pointer">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Side Links */}
        <div className="md:col-span-3 space-y-4">
          <a
            href="https://hvkhqs.edu.vn/chuyen-muc/trung-tam-ngoai-ngu/"
            target="blank"
            className="block"
          >
            <img
              src="images/banner/a4.png"
              alt="Foreign Language Center"
              className="w-full rounded-lg"
            />
          </a>
          <a
            href="https://hvkhqs.edu.vn/chuyen-muc/tuyen-sinh/"
            target="blank"
            className="block"
          >
            <img
              src="images/banner/a5.png"
              alt="Admissions"
              className="w-full rounded-lg"
            />
          </a>
        </div>
      </div>
      <hr />
      <div className="my-10 flex flex-wrap justify-center">
        <img
          src="images/templatesPic/b1.jpg"
          alt=""
          className="max-w-[210px]"
        />
        <img
          src="images/templatesPic/b2.jpg"
          alt=""
          className="max-w-[210px]"
        />
        <img
          src="images/templatesPic/b3.jpg"
          alt=""
          className="max-w-[210px]"
        />
        <img
          src="images/templatesPic/b4.jpg"
          alt=""
          className="max-w-[210px]"
        />
        <img
          src="images/templatesPic/b5.jpg"
          alt=""
          className="max-w-[210px]"
        />
        <img
          src="images/templatesPic/b6.jpg"
          alt=""
          className="max-w-[210px]"
        />
      </div>
    </div>
  );
}
