"use client";

import { useAlert } from "@/app/components/Alert/alertbase";
import { MiddlewareAuthor } from "@/middleware/Author";
import { Grade } from "@/models/Grade";
import { Position } from "@/models/User";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

 function StudyPoint({ id }: { id: number }) {
  const { addAlert } = useAlert();
  const [studentgrade, setStudentGrade] = useState<Grade[]>([]);

  // const getStudentGrade = () =>{
  //   const data = await getGradeOfClass(id);
  //   setStudentGrade
  // }
  useEffect(() => {



  }, []);

  return <div>
    <div>

    </div>
  </div>;
}
export default MiddlewareAuthor(StudyPoint,[Position.SUB_TEACHER, Position.ADVISOR]);
