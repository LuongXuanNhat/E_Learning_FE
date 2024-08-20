import React, { useEffect, useRef, useState } from "react";
import { getCookieUser, setCookie } from "../services/authService";
import { AlertType, useAlert } from "../app/components/Alert/alertbase";
import { Position, PositionLabels } from "../models/User";
import { CookieName } from "../models/keyCookie";

export function MiddlewareAuthor<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  positions: Position[]
) {
  return function WithAuthComponent(props: P) {
    const { addAlert } = useAlert();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const isTrueRef = useRef(true);

    useEffect(() => {
      const user = getCookieUser();
      if (!user && isTrueRef.current) {
        isTrueRef.current = false;
        setIsAuthenticated(true);
        addAlert(
          AlertType.warning,
          "Bạn không có quyền truy cập, hãy đăng nhập trước!"
        );
        setCookie(CookieName.isReload, "true");
      } else {
        let result = false;
        positions.forEach((item) => {
          if (user?.chuc_vu == PositionLabels[item]) {
            result = true;
          }
        });
        if (!result && isTrueRef.current) {
          isTrueRef.current = false;
          setIsAuthenticated(true);
          addAlert(AlertType.warning, "Bạn không có quyền truy cập");
          setCookie(CookieName.isReload, "true");
        }
      }
    }, []);
    if (isAuthenticated) {
      return (
        <div className="flex pt-52 font-bold justify-center items-center">
          Bạn không có quyền truy cập
        </div>
      );
    } else return <WrappedComponent {...props} />;
  };
}