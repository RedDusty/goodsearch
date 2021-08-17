import UploadContainer from './upload/UploadContainer';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserProvider';
import { Redirect } from 'react-router-dom';
import { tipsType, userType } from '../types';

const Upload: React.FC<{
  setTips: React.Dispatch<React.SetStateAction<tipsType>>;
  tips: tipsType;
}> = ({ setTips, tips }) => {
  const user: userType = useContext(UserContext);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (!user.uid || user.banned) {
      setRedirect('/');
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  document.title = 'GoodSearch upload';

  return (
    <div className="w-full h-full flex flex-col items-center">
      <UploadContainer setTips={setTips} tips={tips} />
    </div>
  );
};

export default Upload;
