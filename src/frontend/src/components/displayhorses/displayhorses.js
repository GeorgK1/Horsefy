import { Icon,  Flex, Text } from '@chakra-ui/react';
import { FaHorse } from 'react-icons/fa';

function DisplayHorses(props) {
    
    return props.horses.map((participant) => (
        <Flex>
            <Icon as={FaHorse} h={6} w={6} />
            <Text mx={10}>{participant.name}</Text>
        </Flex>
    ));
}

export default DisplayHorses;