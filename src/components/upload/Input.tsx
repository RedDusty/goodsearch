import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone"

export const Input: React.FC<{getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T, getInputProps:  <T extends DropzoneInputProps>(props?: T | undefined) => T, open: () => void}> = ({getRootProps, getInputProps, open}) => {
    return (<div
        className="bg-blue-200 w-full sm:w-72 h-72 shadow-lg sm:rounded-3xl flex flex-col justify-center items-center mt-6"
        {...getRootProps()}
      >
        <input
          type="file"
          name=""
          id=""
          className="opacity-0 select-none"
          {...getInputProps()}
        />
        <p className="font-medium text-lg text-blue-900 m-4">
          Drag n' drop file here or use the button below.
        </p>
        <p className="font-medium text-lg text-blue-900 m-4">16 mb max size!</p>
        <button className="btn-pr" onClick={open}>
          Choose file
        </button>
      </div>)
}