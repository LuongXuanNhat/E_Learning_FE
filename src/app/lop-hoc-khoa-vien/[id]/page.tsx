"use client";
import { MiddlewareAuthor } from "@/middleware/Author";
import ClassReview from "../../lop-hoc/[id]/classreview";
import { Position } from "@/models/User";

function ReviewClassMain({ params }: { params: { id: number } }) {
  return <ClassReview id={params.id} />;
}
export default MiddlewareAuthor(ReviewClassMain, [
  Position.SECRETARY,
  Position.ADVISOR,
]);
