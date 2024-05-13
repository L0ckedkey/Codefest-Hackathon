import { useState, useRef } from 'react'
import { useParams } from "react-router-dom"
import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from "../../contexts/auth-context"
import { toast } from "react-toastify"
import { useLoading } from '../../contexts/loading-context'

export default function MyProfile() {
  // const [userProfile, setUserProfile] = useState(null)

  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const profileImage = useRef(null)

  // const { id } = useParams()
  // const { setIsLoading } = useLoading()
  // const { user } = useAuth()

  // const openChooseImage = () => {
  //   profileImage.current!.click()
  // }

  // const changeProfileImage = event => {
  //   const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
  //   const selected = event.target.files[0]

  //   if (selected && ALLOWED_TYPES.includes(selected.type)) {
  //     let reader = new FileReader()
  //     reader.onloadend = () => setUserProfile(reader.result)
  //     return reader.readAsDataURL(selected)
  //   }
  //   onOpen()
  // }

  // const fetch = async () => {
  //   try {
  //       setIsLoading(true)
  //       const res = await chordify_backend.getUserById(Principal.fromText(id!))
  //       if ('Ok' in res) {
  //           const data = res.Ok
  //           const userRes: UserType = {
  //               id: data.id,
  //               username: data.username,
  //               imageUrl: data.imageUrl
  //           }
  //           setUser(musicRes)
  //       }
  //   } catch (error) {
  //       toast.error("Failed to get user")
  //   }
  //   setIsLoading(false)
  // }

  return (
    <div>
      asd
    </div>
  )
}
