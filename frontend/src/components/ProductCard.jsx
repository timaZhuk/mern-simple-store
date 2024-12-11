import React from "react";
import { useState } from "react";
import {
  Box,
  Image,
  Heading,
  IconButton,
  HStack,
  VStack,
  useColorModeValue,
  useToast,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

//--------------------------------------------------------
const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();

  const [updatedProduct, setUpdateProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //----UPDATE---------
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated OK",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //----- DELTE button handler

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } // ----if-else
  }; // ----Delete product function

  return (
    <>
      <Box
        shadow={"lg"}
        rounded="lg"
        overflow={"hidden"}
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
            />
          </HStack>
        </Box>
        {/* *********************************** */}
        {/* MODAL WINDOW for UPDTAE=EDIT button */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdateProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdateProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Product ImageURL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdateProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End of Modal window */}
      </Box>
    </>
  );
};

export default ProductCard;
