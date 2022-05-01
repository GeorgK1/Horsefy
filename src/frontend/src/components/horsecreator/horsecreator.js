import { Formik, Field, Form } from 'formik';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
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
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function validateName(value) {
    let error;

    if (!value) {
        error = 'Name is required';
    } else if (value.length < 3) {
        error = 'Name must be at least 3 characters';
    } else if (value.length > 15) {
        error = 'Name must be 15 characters or less';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
        error = 'Name must be alphanumeric';
    }

    return error;
}

function validateColor(value) {
    let error;

    if (!value) {
        error = 'Color is required';
    } else if (value.length < 3) {
        error = 'Color must be at least 3 characters';
    } else if (value.length > 15) {
        error = 'Color must be 15 characters or less';
    }

    return error;
}


function HorseCreator() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const formBackground = useColorModeValue('white', 'gray.800');

    const modalClose = () => {
        onClose();
        window.location.reload(false);
    };

    return (
        <>
            <Button variant={'link'} onClick={onOpen}>
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
                                    initialValues={{ name: 'Rudolph' }}
                                    onSubmit={(values, actions) => {
                                        axios
                                            .post(
                                                'http://localhost:8080/api/v1/horsefy/horse',
                                                {
                                                    name: values.name,
                                                    color: values.color,
                                                }
                                            )
                                            .then(function (response) {
                                                toast({
                                                    title: 'Horse added.',
                                                    description:
                                                        'Horse has been saved to the database.',
                                                    status: 'success',
                                                    duration: 9000,
                                                    isClosable: true,
                                                });
                                            })
                                            .catch(function (error) {
                                                if (
                                                    error.code ===
                                                    'ERR_BAD_REQUEST'
                                                ) {
                                                    toast({
                                                        title: 'Error',
                                                        description:
                                                            'Horse with this name already exists.',
                                                        status: 'error',
                                                        duration: 9000,
                                                        isClosable: true,
                                                    });
                                                }
                                            });

                                        setTimeout(() => {
                                            actions.setSubmitting(false);
                                             
                                        }, 1000);
                                       
                                    }}>
                                    {(props) => (
                                        <Form>
                                            <Field
                                                name='name'
                                                validate={validateName}>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.name &&
                                                            form.touched.name
                                                        }>
                                                        <FormLabel htmlFor='name'>
                                                            Horse name
                                                        </FormLabel>

                                                        <Input
                                                            {...field}
                                                            size={'lg'}
                                                            id='name'
                                                            placeholder='i.e Rudolph'
                                                            type={'text'}
                                                        />

                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .name
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field
                                                name='color'
                                                validate={validateColor}>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.color &&
                                                            form.touched.color
                                                        }>
                                                        <FormLabel htmlFor='color'>
                                                            Horse color
                                                        </FormLabel>

                                                        <Input
                                                            {...field}
                                                            size={'lg'}
                                                            id='name'
                                                            type={'color'}
                                                        />

                                                        <FormErrorMessage>
                                                            {form.errors.color}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

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
