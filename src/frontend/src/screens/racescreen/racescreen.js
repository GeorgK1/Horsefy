import { Box, useColorModeValue, Text, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function RaceScreen() {
    const [raceList, setRaceList] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/horsefy/allraces')
            .then((response) => {
                setRaceList(response.data);
            });
    }, []);

    return (
        <Center py={'10px'}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('gray.50', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                {raceList.map((race) => (
                    <Text>{race.place}</Text>
                ))}
            </Box>
        </Center>
    );
}

export default RaceScreen;
