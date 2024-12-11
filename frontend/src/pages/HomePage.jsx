import React from "react";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import ProductCard from "../components/ProductCard";

import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  //console.log(products);
  //--------------
  return (
    <>
      <Container maxW={"container.xl"} py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.400)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Current Products <SlBasket />
          </Text>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
          <SimpleGrid
            columns={{
              base: 1,
              md: 1,
              lg: 1,
            }}
          >
            {products.length === 0 && (
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                fontWeight={"bold"}
                color="gray.500"
              >
                No products are found <FaExclamationTriangle />
                <Link to={"/create"}>
                  <Text
                    as="span"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
};

export default HomePage;
