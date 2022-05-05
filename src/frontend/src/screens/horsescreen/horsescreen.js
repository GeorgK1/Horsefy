import { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

function HorseScreen() {
    const [horseList, setHorseList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios
            .get('/api/v1/horsefy/horses')
            .then((response) => {
                if (response.data[0].name) {
                    setHorseList(response.data);
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, []);
    
    if (error) {
        return <Text>{error.message}</Text>;
    }
    return (
        <SimpleGrid
            columns={{
                base: 1,
                sm: 1,
                md: 2,
                lg: 4,
            }}>
            {horseList.map((horse) => (
                <Box
                    id={horse.id}
                    maxW={'270px'}
                    w={'full'}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    margin={'10'}
                    overflow={'hidden'}>
                    <div style={{backgroundColor: horse.color}}>
                        <Text fontSize={'xl'}>{horse.name}</Text>
                    </div>
                   
                </Box>
            ))}
        </SimpleGrid>
    );
}

export default HorseScreen;
