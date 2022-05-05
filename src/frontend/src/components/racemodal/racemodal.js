import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Box,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

function RaceModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [raceResult, setRaceResult] = useState({});

    const postRace = (id) => {
        axios
            .post(
                `http://localhost:8080/api/v1/horsefy/races/start?raceId=${id}`
            )
            .then((response) => {
                if (response.status === 200) {
                    setRaceResult(response.data);
                }
            })
            .catch((error) => {
                if (error.code === 'ERR_BAD_REQUEST') {
                }
            });
    };

    const removeRace = () => {
        axios
            .post(
                `http://localhost:8080/api/v1/horsefy/races/?raceId=${props.race.id}`
            )
            .then((response) => console.log(response));
        window.location.reload(false);
    };

    const openResultModal = () => {
        postRace(props.race.id);
        onOpen();
    };

    const exitResultModal = () => {
        onClose();
        removeRace(props.race.id);
    };

    return (
        <>
            <Button
                colorScheme='green'
                onClick={() => openResultModal(props.race.id)}>
                Start race
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {raceResult.win ? 'You won!' : 'You lost!'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Text>Your bet: {raceResult.bet}</Text>

                            <Text>Winner: {raceResult.winner}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => exitResultModal(props.race.id)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RaceModal;
