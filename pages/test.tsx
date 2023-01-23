import { ToastContainer, toast } from 'react-toastify'
import Dropzone from 'react-dropzone'
import 'react-toastify/dist/ReactToastify.css'

const Test = () => {
  const onDrop = (acceptedFiles: any) => {
    toast('onDrop')
    toast(acceptedFiles?.length)
    toast(acceptedFiles.toString())
  }

  return (
    <div>
      <ToastContainer />
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <>
            <img src="/next.svg" width={200} alt="" {...getRootProps()} />
            <input {...getInputProps()} />
          </>
        )}
      </Dropzone>
    </div>
  )
}

export default Test
