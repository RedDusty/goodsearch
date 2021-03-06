import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fileType, tipsType } from '../../types';
import { Input } from './Input';
import LoadingIcon from '../icons/LoadingIcon';
import Preview from './Preview';
import { getPreview } from '../../scripts';

const UploadContainer: React.FC<{
  setTips: React.Dispatch<React.SetStateAction<tipsType>>;
  tips: tipsType;
}> = ({ setTips, tips }) => {
  const [file, setFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState<fileType>();
  const [tags, setTags] = useState<string[]>([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size > 16777216) {
        return <p>Большой размер!</p>;
      } else {
        getPreview(acceptedFiles[0], setPreviewFile);
        setFile(acceptedFiles[0]);
      }
    },
    multiple: false,
    noKeyboard: true,
    noClick: true
  });

  let render: JSX.Element = <div></div>;

  if (!file) {
    render = (
      <Input getInputProps={getInputProps} getRootProps={getRootProps} open={open} setTips={setTips} tips={tips} />
    );
  }

  if (file && previewFile?.source) {
    render = (
      <Preview
        setFile={setFile}
        setPreviewFile={setPreviewFile}
        previewFile={previewFile}
        setTags={setTags}
        tags={tags}
        setTips={setTips}
        tips={tips}
      />
    );
  }
  if (file && previewFile?.source === undefined) {
    render = <LoadingIcon size={200} />;
  }

  return <div className="w-full h-full flex justify-center items-center">{render}</div>;
};
export default UploadContainer;
