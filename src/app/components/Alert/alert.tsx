import { Alert } from "@material-tailwind/react";
import React, { FC, useState } from "react";
import { AlertType, useAlert } from "./alertbase";

interface ShowAlertProps {
  id: number;
  type: AlertType;
  message: string;
}

export const ShowAlert: FC<ShowAlertProps> = ({ id, type, message }) => {
  const { removeAlert } = useAlert();

  const alertColor =
    type === AlertType.error
      ? "red"
      : type === AlertType.success
      ? "green"
      : type === AlertType.info
      ? "blue"
      : type === AlertType.warning
      ? "amber"
      : "gray";

  return (
    <div className="bg-transparent my-2">
      <Alert
        className="shadow-md"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={alertColor}
        onClose={() => removeAlert(id)}
      >
        {message}
      </Alert>
    </div>
  );
};
