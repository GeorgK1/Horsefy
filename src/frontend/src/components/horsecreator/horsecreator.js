import { Formik, Form, useField, ErrorMessage } from 'formik';
import {
    Input,
    Button,
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useColorModeValue,
    Text,
    createStandaloneToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { object, string } from 'yup';

function handleFormSubmit(values, actions) {
    const toast = createStandaloneToast();

    axios
        .post('/api/v1/horsefy/horses', {
            name: values.name,
            color: values.color,
        })
        .then(() => {
            toast({
                title: 'Horse added.',
                description: 'Horse has been saved to the database.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        })
        .catch((error) => {
            if (error.code === 'ERR_BAD_REQUEST') {
                toast({
                    title: 'Error',
                    description: 'Horse with this name already exists.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        });

    setTimeout(() => {
        actions.setSubmitting(false);
    }, 1000);
}
//yup validation schema
const horseValidation = object().shape({
    name: string()
        .min(2, 'Too short')
        .strict()
        .max(20, 'Too long')
        .required('Name is required'),
    color: string().required('Color is required'),
});

function NameField() {
    const [field] = useField('name');

    return (
        <>
            <Text>Name</Text>
            <Input
                {...field}
                size={'lg'}
                id='name'
                placeholder='i.e Rudolph'
                type={'text'}
            />

            <ErrorMessage name={field.name} component='div' />
        </>
    );
}

function ColorField() {
    const [field] = useField('color');

    return (
        <>
            <Text>Color</Text>
            <Input
                {...field}
                size={'lg'}
                id='color'
                placeholder='i.e. white'
                type={'color'}
            />

            <ErrorMessage name={field.name} component='div' />
        </>
    );
}

function HorseCreator() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formBackground = useColorModeValue('white', 'gray.800');

    const modalClose = () => {
        onClose();
        window.location.reload(false);
    };

    return (
        <>
            <Button variant={'link'} onClick={onOpen} mx={1}>
                Click here to add
            </Button>
            <Modal isOpen={isOpen} onClose={modalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a horse</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            alignContent={'center'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            p={6}
                            w={'full'}>
                            <Box bg={formBackground}>
                                <Formik
                                    initialValues={{
                                        name: 'Rudolph',
                                        color: '#F38A73',
                                    }}
                                    validationSchema={horseValidation}
                                    onSubmit={handleFormSubmit}>
                                    {(props) => (
                                        <Form>
                                            <NameField />
                                            <ColorField />

                                            <Button
                                                mt={4}
                                                colorScheme='green'
                                                isLoading={props.isSubmitting}
                                                type='submit'>
                                                Save the horse!
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default HorseCreator;
