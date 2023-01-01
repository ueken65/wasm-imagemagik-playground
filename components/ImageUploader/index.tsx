import { Input, Image, Container, Button, Flex } from '@chakra-ui/react'
import { useImageConvertor } from './hooks'

export const ImageUploader = () => {
  const {
    selectedImageURL,
    handleOnChangeInput,
    handleOnClickRotateButton,
    handleOnClickUndoButton,
    canUndo,
    handleOnClickRedoButton,
    canRedo,
  } = useImageConvertor()

  return (
    <Container>
      <Input onChange={handleOnChangeInput} type="file" />
      {selectedImageURL && <Image src={selectedImageURL} alt="" />}
      <div className="my-2">
        <Flex gap={4}>
          <Button disabled={selectedImageURL === null} colorScheme="blue" onClick={handleOnClickRotateButton}>
            Rotate
          </Button>
        </Flex>
      </div>
      <Flex gap={4}>
        <Button disabled={!canUndo} colorScheme="blue" onClick={handleOnClickUndoButton}>
          Undo
        </Button>
        <Button disabled={!canRedo} colorScheme="blue" onClick={handleOnClickRedoButton}>
          Redo
        </Button>
      </Flex>
    </Container>
  )
}
