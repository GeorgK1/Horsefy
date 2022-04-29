import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const features = [
    {
        title: 'Horsefy is fair and legal ',
        text: 'Our gambling application is in full compliance with the Gambling Act of 2018. An independent contractor was hired to ensure full transparency.',
    },
    {
        title: 'A classic game ',
        text: 'Horse betting has been a staple in gambling for centuries. Even on carnivals there are games based on this old tradition. Horsefy aims to bring this traditional competition into the digital age.',
    },
    {
        title: 'Taking the market by storm ',
        text: 'Our start up company has grown considerably since our founding in 2022. According to everyone we are one of the fastest growing startups in the world.',
    },
    {
        title: 'Top secret algorithms ',
        text: 'Our application implements space-grade algorithms,giving us an edge against comparable applications running on traditional methods.',
    },
    {
        title: 'Costs and fees',
        text: 'At Horsefy we decided to keep the costs and per play fees to a minimum. We aim to provide the best service at a highly competetive price of free.',
    },
    {
        title: 'Best horses on the market ',
        text: 'We at Horsefy take the quality of the participating horses very seriously. We ensure that the horses we provide are the best on the market.',
    },
    {
        title: 'State of the art website ',
        text: 'Our website is built with the latest technologies and is constantly updated to ensure the best user experience.',
    },
    {
        title: 'Providing the best service since 2022',
        text: 'During our long time in business we have been able to provide the best service to our customers. We are proud of our success and we are proud of our customers.',
    },
];

export default function Features() {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Place your bet on Horsefy</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    What do we offer?
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 2, md: 2, lg: 2 }} spacing={10}>
                    {features.map((feature) => (
                        <HStack key={feature.id} align={'top'}>
                            <Box color={'green.400'} px={2}>
                                <Icon as={CheckIcon} />
                            </Box>
                            <VStack align={'start'}>
                                <Text fontWeight={600}>{feature.title}</Text>
                                <Text color={'gray.600'}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
