import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Page404 = () => {
  const navigate = useNavigate();
  const navigatetohome = () => {
    navigate('/');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" style={{backgroundColor:"black"}} onClick={() => navigatetohome()}>
          Back Home
        </Button>
      }
    />
  );
};
export default Page404;
