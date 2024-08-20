export interface Course {
  course_id: number;
  subject_id: number;
  name: string;
  description: string;
  status: string;
  start_date: string | Date;
  end_date: string | Date;
  registration_deadline: string | Date;
  image_url: string | null;
  created_at: string | Date;
}

export enum de_xuat_ten_khoa_hoc {
  Toan_cao_cap = "Toán cao cấp",
  Triet_hoc_Mac_LeNin = "Triết học Mác-Lênin",
  Khoa_hoc_may_tinh = "Khoa học máy tính",
  He_thong_thong_tin = "Hệ thống thông tin",
  Phat_trien_phan_mem = "Phát triển phần mềm",
  Tri_thuc_nhan_tao = "Trí tuệ nhân tạo",
  Mang_may_tinh = "Mạng máy tính",
  An_toan_thong_tin = "An toàn thông tin",
  Cau_truc_du_lieu_va_giai_thuat = "Cấu trúc dữ liệu và giải thuật",
  Phan_tich_thiet_ke_he_thong = "Phân tích thiết kế hệ thống thông tin",
}
