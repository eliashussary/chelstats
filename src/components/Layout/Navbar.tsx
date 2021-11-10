import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Link,
  Center,
  useDisclosure,
  Stack,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import NextLink from "next/link";
import React from "react";
import { DarkModeSwitch } from "../DarkModeSwitch";

interface MenuItem extends BoxProps {}

const MenuItem: React.FC<MenuItem> = (props) => {
  const { children, ...rest } = props;
  return (
    <Box p={5} alignContent={"center"} justifyContent={"center"} {...rest}>
      <Center>{children}</Center>
    </Box>
  );
};

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box zIndex={3} position={"relative"}>
      <Flex size="container.xl">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={6}
          width={"full"}
        >
          <Flex align={"center"} mr={5}>
            <Link as={NextLink} href="/">
              <>
                <Image src="/logo.png" size="xs" maxW={50} />
                <Heading
                  as="i"
                  size="lg"
                  letterSpacing={"tighter"}
                  textStyle={"italic"}
                >
                  CHEL STATS
                </Heading>
              </>
            </Link>
          </Flex>
          <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
            <HamburgerIcon />
          </Box>
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: isOpen ? "block" : "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            spacing={5}
          >
            <Link as={NextLink} href="/">
              Club Search
            </Link>
            <Spacer />
          </Stack>

          <Spacer />
          <Flex>
            <DarkModeSwitch />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
