import { useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {const error = useRouteError();  
  return (
    <Result
      status={error.status}
      title={error.status}
      subTitle={error.statusText}
    />
  );
}
