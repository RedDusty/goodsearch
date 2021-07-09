import UploadContainer from "./upload/UploadContainer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import { Redirect } from "react-router-dom";
import { userType } from "../types";

function Upload() {
  const user: userType = useContext(UserContext);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (!user.uid || user.banned) {
      setRedirect("/");
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  document.title = "Hornylib upload"

  return (
    <div className="w-full h-full flex flex-col items-center">
      <UploadContainer />
    </div>
  );
}

export default Upload;
