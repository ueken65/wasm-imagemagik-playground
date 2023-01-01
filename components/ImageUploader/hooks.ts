import { useToast } from '@chakra-ui/react'
import { ChangeEvent, useReducer } from 'react'
import { initializeImageMagick, ImageMagick } from '@imagemagick/magick-wasm'

type State = {
  images: Blob[]
  selectedImageIndex: number
}

type Action =
  | { type: 'UPLOAD'; uploadedImage: Blob }
  | { type: 'DO'; newImage: Blob }
  | { type: 'UNDO' }
  | { type: 'REDO' }

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'UPLOAD':
      return { images: [action.uploadedImage], selectedImageIndex: 0 }

    case 'DO': {
      const nextImages = prevState.images.slice(prevState.selectedImageIndex)
      nextImages.unshift(new Blob([action.newImage]))

      return {
        images: nextImages,
        selectedImageIndex: 0,
      }
    }

    case 'UNDO':
      return {
        images: [...prevState.images],
        selectedImageIndex: prevState.selectedImageIndex + 1,
      }

    case 'REDO':
      return {
        images: [...prevState.images],
        selectedImageIndex: prevState.selectedImageIndex - 1,
      }
  }
}

const initialState: State = {
  images: [],
  selectedImageIndex: 0,
}

export const useImageConvertor = () => {
  const [{ images, selectedImageIndex }, dispatch] = useReducer(reducer, initialState)
  const toast = useToast()

  const selectedImage = images[selectedImageIndex]

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files === null) return

    dispatch({ type: 'UPLOAD', uploadedImage: files[0] })
  }

  const handleOnClickRotateButton = async () => {
    if (selectedImage === undefined) throw new Error('image is not selected.')

    const content = new Uint8Array(await selectedImage.arrayBuffer())

    initializeImageMagick()
      .then(async () => {
        await ImageMagick.read(content, (image) => {
          image.rotate(90)

          image.write((data) => dispatch({ type: 'DO', newImage: new Blob([data]) }))
        })
      })
      .catch((err) => {
        toast({
          status: 'error',
          description: err,
          title: '画像変換時にエラーが発生しました',
          isClosable: true,
        })
      })
  }

  const handleOnClickUndoButton = () => dispatch({ type: 'UNDO' })
  const handleOnClickRedoButton = () => dispatch({ type: 'REDO' })

  return {
    selectedImageURL: selectedImage === undefined ? null : URL.createObjectURL(selectedImage),
    handleOnChangeInput,
    handleOnClickRotateButton,
    handleOnClickUndoButton,
    canUndo: selectedImageIndex < images.length - 1,
    handleOnClickRedoButton,
    canRedo: selectedImageIndex !== 0,
  }
}
