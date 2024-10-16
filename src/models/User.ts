export interface User {
  user_id: number;
  username: string;
  name: string;
  cap_bac: string;
  chuc_vu: string;
  email: string;
  password: string;
  role: Position | undefined;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string | Date;

  avatar?: string;
}

export enum Position {
  // Giảng viên
  SUB_TEACHER = "SUB_TEACHER",
  // Học viên
  STUDENT = "STUDENT",
  // Phòng đào tạo
  EDUCATION = "EDUCATION",
  // Cố vấn học tập
  ADVISOR = "ADVISOR",
  // Thư ký khoa
  SECRETARY = "SECRETARY",
}

export const PositionLabels: Record<Position, string> = {
  [Position.SUB_TEACHER]: "Giảng viên",
  [Position.STUDENT]: "Sinh viên",
  [Position.EDUCATION]: "Phòng đào tạo",
  [Position.ADVISOR]: "Cố vấn học tập",
  [Position.SECRETARY]: "Thư ký",
};

export const LabelToPosition: Record<string, Position> = Object.entries(
  PositionLabels
).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: key as Position,
  }),
  {}
);
export function getPositionFromString(value: string): Position | undefined {
  if (Object.values(Position).includes(value as Position)) {
    return value as Position;
  }
  return LabelToPosition[value];
}

export enum Rank {
  DaiTuong = "Đại tướng",
  ThuongTuong = "Thượng tướng",
  TrungTuong = "Trung tướng",
  ThieuTuong = "Thiếu tướng",
  DaiTa = "Đại tá",
  ThuongTa = "Thượng tá",
  TrungTa = "Trung tá",
  ThieuTa = "Thiếu tá",
  DaiUy = "Đại úy",
  ThuongUy = "Thượng úy",
  TrungUy = "Trung úy",
  ThieuUy = "Thiếu úy",

  ThuongSi = "Thượng sĩ",
  TrungSi = "Trung sĩ",
  HaSi = "Hạ sĩ",
  BinhNhi = "Binh nhất",
  BinhNhat = "Binh nhì",
}

export interface StudentAttendanceSummary {
  student_id: number;
  student_name: string;
  attendance_count: number;
}
