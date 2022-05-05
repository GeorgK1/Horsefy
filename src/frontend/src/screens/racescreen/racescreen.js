import { Box, Text, Center, SimpleGrid } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import DisplayHorses from '../../components/displayhorses/displayhorses';
import RaceModal from '../../components/racemodal/racemodal';
import axios from 'axios';

function RaceScreen() {
    const [raceList, setRaceList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios
            .get('/api/v1/horsefy/races')
            .then((response) => {
                if (response.data[0].place) {
                    setRaceList(response.data);
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if(raceList.length === 0) {
        return (
            <Center>
                <Text>
                    No horse races yet.
                </Text>
            </Center>
        )
    }

    return (
        <SimpleGrid
            columns={{
                base: 1,
                sm: 1,
                md: 2,
                lg: 4,
            }}>
            {/* display only uncompleted races */}
            {raceList
                .filter((race) => !race.completed)
                .map((race) => (
                    <Box
                        id={race.id}
                        maxW={'270px'}
                        w={'full'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        margin={'10'}
                        overflow={'hidden'}>
                        <Text fontSize={'xl'}>Place: {race.place}</Text>
                        <Text fontSize={'xl'}>Date: {race.date}</Text>

                        <Text fontSize={'xl'}>Your bet: {race.bet}</Text>
                        <Text mt={5}>Participants</Text>
                        <DisplayHorses horses={race.horses} />

                        <Center my={10}>
                            <RaceModal race={race} />
                        </Center>
                    </Box>
                ))}
        </SimpleGrid>
    );
}

export default RaceScreen;
