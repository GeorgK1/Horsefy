import { useEffect, useState } from 'react';
import { Box, Text, Center, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

function ResultScreen() {
    const [resultList, setResultList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios
            .get('/api/v1/horsefy/races/results')
            .then((response) => {
                if (response.data[0].winner) {
                    setResultList(response.data);
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    return (
        <SimpleGrid
            columns={{
                base: 1,
                sm: 1,
                md: 2,
                lg: 4,
            }}>
            {resultList.map((result) => (
                <Box
                    id={result.id}
                    maxW={'270px'}
                    w={'full'}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    margin={'10'}
                    overflow={'hidden'}>
                    <Text fontSize={'xl'}>{result.win ? "You won" : "You lost"}</Text>
                    <Text fontSize={'xl'}>Your bet: {result.bet}</Text>

                    <Text fontSize={'xl'}>Winner: {result.winner}</Text>
                   
                </Box>
            ))}
        </SimpleGrid>
    );
}

export default ResultScreen;
