"use client";
import { Typography } from "@material-tailwind/react";
import { roboto } from "../lib/font";

export default function Introduce() {
  return (
    <div className="px-8 py-10 lg:py-20">
      <div className="container mx-auto">
        <Typography
          as="span"
          variant="h2"
          color="blue-gray"
          className="mb-4 !text-2xl lg:!text-4xl"
        >
          Học viện Khoa học Quân sự (NQH)
        </Typography>
        <Typography variant="lead" as="span" className=" !text-gray-500 mb-5">
          là một học viện quân sự trực thuộc Bộ Quốc phòng Việt Nam chuyên đào
          tạo sĩ quan các ngành: tình báo, ngoại ngữ, đối ngoại quân sự, trinh
          sát kỹ thuật. Bên cạnh đào tạo sĩ quan ngoại ngữ, học viện còn đào tạo
          cử nhân ngoại ngữ phục vụ toàn dân trong hệ thống giáo dục của bộ giáo
          dục ban hành.
        </Typography>
        <Typography as="div">
          <div className="mb-3">
            <li>
              <a
                href="#gioithieu-1"
                className="font-bold text-blue-800 text-xl"
              >
                Lịch sử hình thành
              </a>
            </li>
            <li>
              <a
                href="#gioithieu-2"
                className="font-bold text-blue-800 text-xl"
              >
                Địa chỉ
              </a>
            </li>
            <li>
              <a
                href="#gioithieu-3"
                className="font-bold text-blue-800 text-xl"
              >
                Các ngành đào tạo
              </a>
            </li>
          </div>
        </Typography>
      </div>
      <img src="images/bg3.jpg" className="w-screen" />
      <div className={`${roboto.className} antialiased mt-20`}>
        <h3 className="font-bold text-xl pt-10 lg:pt-20" id="gioithieu-1">
          #Lịch sử hình thành
        </h3>
        <Typography as="div" variant="lead" className=" !text-gray-500 ">
          <div>
            Ngày 10-6-1957, Học viện Khoa học Quân sự (tiền thân là Phòng Huấn
            luyện 77) được thành lập. Học viện được thành lập năm 1957 trên cơ
            sở sáp nhập 3 trường chính: Đại học Ngoại ngữ Quân sự 1982 Trường Sĩ
            quan Trinh sát kỹ thuật. Trường Sĩ quan Quân báo. Trải qua quá trình
            xây dựng, chiến đấu và trưởng thành, Học viện Khoa học Quân sự đã
            trở thành trung tâm hàng đầu đào tạo ngoại ngữ và quan hệ quốc tế về
            quốc phòng trong Quân đội. Hiện nay, Học viện được giao nhiệm vụ đào
            tạo cử nhân, thạc sĩ, tiến sĩ chuyên ngành Khoa học Quân sự; cử nhân
            ngoại ngữ quân sự các chuyên ngành tiếng Anh, tiếng Trung Quốc,
            tiếng Nga, tiếng Pháp; thạc sĩ ngôn ngữ Anh, ngôn ngữ Trung Quốc; cử
            nhân Quan hệ quốc tế về quốc phòng; cử nhân Việt Nam học; cử nhân
            ngoại ngữ dân sự; bồi dưỡng kiến thức quân sự, quốc phòng; liên kết
            với Học viện Chính trị Quốc gia Hồ Chí Minh đào tạo ngắn hạn cán bộ
            chính trị cấp trung đoàn; liên kết với Học viện Quốc phòng đào tạo
            Chỉ huy Tham mưu cao cấp; đào tạo ngoại ngữ cho các học viện, nhà
            trường trong toàn quân; tổ chức thi và cấp chứng chỉ tiếng Anh trình
            độ B1, B2 theo khung tham chiếu châu Âu cho các cơ sở đào tạo sau
            đại học trong và ngoài quân đội. Đào tạo học viên quân sự nước ngoài
            cho 22 nước theo hiệp định và quan hệ đối đẳng giữa Bộ Quốc phòng
            Việt Nam với bộ quốc phòng các nước trong khu vực và trên thế giới.
            Ngoài ra, Học viện còn tham gia tích cực các hoạt động đối ngoại
            quốc phòng, góp phần xây dựng mối quan hệ hợp tác ngày càng sâu rộng
            giữa Bộ Quốc phòng Việt Nam với các trên thế giới. Từ năm 1988 đến
            nay, Học viện đã đào tạo 753 khóa, 863 lớp, với 18.307 học viên,
            trong đó có 3.898 cử nhân, 457 thạc sĩ đã ra trường và đang đào tạo
            8 khóa với 33 nghiên cứu sinh, 6 khóa với 83 học viên cao học. Hơn
            40 học viên được đào tạo tại trường đã trở thành tướng lĩnh trong
            quân đội. Đội ngũ giảng viên, cán bộ quản lý giáo dục đã trưởng
            thành, phát triển về mọi mặt: 100% cán bộ, giảng viên có trình độ từ
            đại học trở lên, 2 giáo sư, 12 phó giáo sư, 7 nhà giáo ưu tú, 37
            tiến sĩ, 218 thạc sĩ (đạt tỷ lệ 63,27% cán bộ, giáo viên có trình độ
            sau đại học). Từ 2007 đến nay, Học viện có 28 giảng viên đạt danh
            hiệu Nhà giáo giỏi cấp Bộ Quốc phòng; 433 giảng viên đạt danh hiệu
            Giảng viên giỏi cấp Học viện…Ngày 14 tháng 3 năm 2017, Bộ Quốc phòng
            đã có Quyết định số 725/QĐ-BQP về việc phê duyệt Đề án “Nâng cao
            chất lượng đào tạo ngoại ngữ và quan hệ quốc tế tại Học viện Khoa
            học Quân sự giai đoạn 2016-2020”. Từ đây sẽ mở ra cơ hội mới, nhiệm
            vụ mới đầy hứa hẹn nhưng cũng nhiều thử thách đối với Học viện. Trải
            qua bao năm xây dựng, chiến đấu và trưởng thành, các thế hệ cán bộ,
            giáo viên, nhân viên, học viên, chiến sĩ của Học viện đã lập nhiều
            thành tích xuất sắc, được Đảng, Nhà nước, Quân đội tặng nhiều phần
            thưởng cao quý. Kỷ niệm Ngày truyền thống Nhà trường củalà dịp ôn
            lại lịch sử hình thành phát triển của Học viện, các cán bộ, giáo
            viên, nhân viên, học viên, chiến sĩ Học viện Khoa học Quân sự trong
            niềm vui, phấn khởi, tự hào với những thành tích đã đạt được, nguyện
            cùng nhau đoàn kết thống nhất, khắc phục khó khăn, ra sức thi đua,
            phấn đấu hoàn thành xuất sắc nhiệm vụ được giao, xây dựng Đảng bộ
            trong sạch vững mạnh, Học viện vững mạnh toàn diện, viết tiếp truyền
            thống Anh hùng &quot;Chủ động sáng tạo, đoàn kết kỷ luật, khắc phục
            khó khăn, hoàn thành nhiệm vụ&quot; Nhà trường không ngừng nâng cao
            chất lượng giáo dục, đào tạo đáp ứng nhu cầu trong tình hình mới,
            tiếp thu điển hình khoa học giáo dục hiện đại, đồng thời kế thừa,
            lĩnh hội kinh nghiệm trong công tác huấn luyện, đào tạo trong quân
            đội ngành tình báo quốc phòng trong các đơn vị toàn quân. Tập trung
            đổi mới nội dung trong chương trình bảo đảm tính hiệu quả xác thực
            nhất là công tác giảng dạy, kết hợp chặt chẽ dạy học đi đôi với
            nghề, giữa đào tạo chuyên môn, nghiệp vụ, bảo đảm học viên tốt
            nghiệp là học viên đủ phẩm chất, năng lực hoàn thành tốt nhiệm vụ
            được giao. Trong thời gian qua, nhà trường đã luôn tập trung xây
            dựng đội ngũ nhà giáo, cán bộ quản lý cả về phẩm chất chính trị, đạo
            đức và trình độ chuyên môn, nghiệp vụ. Triển khai kế hoạch phát
            triển đội ngũ giảng viên, có chính sách phát triển, trọng dụng, tôn
            vinh với các nhà giáo. Tạo môi trường thuận lợi để đội ngũ cán bộ,
            giảng viên say mê giảng dạy, nghiên cứu khoa học. Tăng cường mở rộng
            hợp tác với các học viện, nhà trường trong và ngoài quân đội, hợp
            tác quốc tế để nâng cao trình độ cho đội ngũ cán bộ, giảng viên góp
            phần nâng cao hơn nữa chất lượng giáo dục đào tạo trong thời gian
            tới. Nâng cao năng lực lãnh đạo sức chiến đấu của các cấp ủy, tổ
            chức đảng, xây dựng đảng bộ trong sạch vững mạnh. Triển khai thực
            hiện hiệu quả theo Nghị quyết Trung ương 4 khóa XII về xây dựng Đảng
            gắn với việc học tập, làm theo tư tưởng, đạo đức, phong cách Hồ Chí
            Minh, các phong trào thi đua quyết thắng cuộc vận động Phát huy
            truyền thống, cống hiến tài năng, xứng danh Bộ đội Cụ Hồ. Đẩy mạnh
            việc dân chủ, tăng cường quản lý, duy trì nghiêm kỷ luật quân đội
            quy định của ngành, bảo đảm bí mật, an ninh an toàn, thực hiện nền
            nếp chính quy, kết hợp chặt chẽ xây dựng môi trường văn hóa quân sự
            lành mạnh, quan tâm chăm lo đời sống cho cán bộ, tăng cường đoàn kết
            quân dân trên địa bàn đóng quân. Với bề dày lịch sử truyền thống
            được đúc kết trong xây dựng, phấn đấu và trưởng thành, Quân ủy Trung
            ương, Bộ Quốc phòng tin tưởng rằng: &quot;Trong thời gian tới Học
            viện Khoa học Quân sự sẽ phát huy tốt, đoàn kết nỗ lực phấn đấu lập
            được nhiều thành tích mới, hoàn thành xuất sắc nhiệm vụ được giao,
            xứng đáng là đơn vị Anh hùng Lực lượng Vũ trang Nhân dân và sự tin
            yêu của Đảng, Nhà nước, lực lượng Quân đội và Nhân dân (Việt
            Nam).&quot;
          </div>
        </Typography>

        <h3 className="font-bold text-xl pt-10 lg:pt-20" id="gioithieu-2">
          #Địa chỉ
        </h3>
        <Typography as="div" variant="lead" className=" !text-gray-500 ">
          <div>
            <li>
              Trụ sở chính: Số 322E, đường Lê Trọng Tấn, phường Định Công, quận
              Hoàng Mai, thành phố Hà Nội, nước Việt Nam.
            </li>
            <li>
              Cơ sở đào tạo 1 (phía Bắc): đường Lai Xá, xã Kim Chung, huyện Hoài
              Đức, thành phố Hà Nội, nước Việt Nam.{" "}
            </li>
            <li>
              Cơ sở đào tạo 2 (phía Nam): đường Trần Văn Dư, quận Tân Bình,
              thành phố Hồ Chí Minh, nước Việt Nam.
            </li>
            <li>
              Cơ sở huấn luyện tạo nguồn: xã Vân Hòa, huyện Ba Vì, thành phố Hà
              Nội, nước Việt Nam.
            </li>
          </div>
        </Typography>

        <h3 className="font-bold text-xl pt-10 lg:pt-20" id="gioithieu-3">
          #Các ngành đào tạo
        </h3>
        <Typography as="div" variant="lead" className=" !text-gray-500 ">
          <div>
            <li>Đại học quân sự </li>
            <li>Trinh sát kỹ thuật </li>
            <li>Quan hệ quốc tế </li>
            <li>Ngôn ngữ Anh </li>
            <li>Ngôn ngữ Nga </li>
            <li>Ngôn ngữ Trung Quốc </li>
          </div>
        </Typography>
      </div>
    </div>
  );
}
