import {
    Stack,
    Flex,
    Text,
    VStack,
    useBreakpointValue,
} from '@chakra-ui/react';
import NavLink from '../navlink/navlink';

export default function Hero() {
    return (
        <Flex
            w={'full'}
            h={'50vh'}
            backgroundImage={'url(/hero.jpg)'}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        textAlign={'center'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({
                            base: '3xl',
                            md: '4xl',
                        })}>
                        Horse races like you've never experienced before
                    </Text>
                </Stack>
                <NavLink
                    bg={'blue.400'}
                 
                    color={'white'}
                    href={'/raceform'}>
                    Get started
                </NavLink>
            </VStack>
        </Flex>
    );
}
