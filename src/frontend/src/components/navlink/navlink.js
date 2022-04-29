import { Link, useColorModeValue } from '@chakra-ui/react';
import { Link as ReachLink } from "react-router-dom"
const NavLink = ({ children, href, bg, color }) => (
    <Link
        as={ReachLink}
        px={2}
        py={2}
        color={color}
        bg={bg}
        fontWeight={700}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('blue.500', 'blue.200'),
        }}
        to={href}>
        {children}
    </Link>
);

export default NavLink;
