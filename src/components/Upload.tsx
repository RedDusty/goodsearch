import UploadContainer from "./upload/UploadContainer";
import HeaderContainer from "./header/HeaderContainer";

function Upload() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <HeaderContainer />
      <UploadContainer />
    </div>
  );
}

export default Upload;
