import { useContext, useRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    AlertDialog, AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useDisclosure
} from "@chakra-ui/react"
import { BsStar } from "react-icons/bs"
import useBookmark from "../../../hooks/useBookmark"
import { GlobalContext } from "../../../context/context"

export default function CAlert({ id }) {
    const { state } = useContext(GlobalContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { addBookmark, isLoading } = useBookmark()
    const cancelRef = useRef()

    const handleAlert = () => {
        if (!state.user) {
            onOpen()
            return
        }
        addBookmark(id)
    }

    return (
        <>
            <IconButton icon={<BsStar />} onClick={() => handleAlert()} isLoading={isLoading} />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Wanna Bookmark ?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Please signin or signup to bookmark the material.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button as={RouterLink} to='/signin' colorScheme='red' onClick={onClose} ml={3}>
                                Take me to login..
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}