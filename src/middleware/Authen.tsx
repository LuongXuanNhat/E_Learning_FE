import React, { useEffect, useRef, useState } from "react";
import { getCookieUser, setCookie } from "../services/authService";
import { AlertType, useAlert } from "../app/components/Alert/alertbase";
import { CookieName } from "../models/keyCookie";

export function MiddlewareAuthen<P extends object>(
  WrappedComponent: React.ComponentType<P>
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
        addAlert(AlertType.info, "Vui lòng đăng nhập để tiếp tục");
        setCookie(CookieName.isReload, "true");
      }
    }, []);
    if (isAuthenticated) {
      return (
        <div className="flex pt-52 font-bold justify-center items-center">
          Trang yêu cầu đăng nhập
        </div>
      );
    } else return <WrappedComponent {...props} />;
  };
}
