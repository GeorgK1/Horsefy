import {
    Box,
    Flex,
    Button,
    Stack,
    useColorMode,
    Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import NavLink from '../navlink/navlink';

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box px={4} boxShadow={'md'}>
                <Flex
                    h={'8vh'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <NavLink
                                href='/raceform'
                                bg={'blue.400'}
                                color={'white'}>
                                Racing
                            </NavLink>
                            <NavLink href='/results'>Race results</NavLink>
                            <NavLink href='/results'>Horses</NavLink>

                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
