import React, { useCallback, useEffect, useState } from "react";
import { Toast } from "@shopify/app-bridge-react";

const ToastAlert = ({ content }) => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  useEffect(() => {
    setActive(content ? true : false);
  }, [content]);

  return (
    <>{active ? <Toast content={content} onDismiss={toggleActive} /> : null}</>
  );
};

export default ToastAlert;
