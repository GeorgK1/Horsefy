import { Formik, Field, Form } from 'formik';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box,
    Flex,
    Text,
    CheckboxGroup,
    Checkbox,
    useColorModeValue,
    useToast,
    SimpleGrid,
} from '@chakra-ui/react';
import HorseCreator from '../../components/horsecreator/horsecreator';
import axios from 'axios';
import { useState, useEffect } from 'react';


function validatePlace(value) {
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

function validateDate(value) {
    let error;
    if (!value) {
        error = 'Date is required';
    }

    return error;
}

function validateBet(value) {
    let error;
    if (!value) {
        error = 'Bet is required';
    }

    return error;
}

function RaceFormScreen() {
    const formBackground = useColorModeValue('white', 'gray.800');
    const [horseList, setHorseList] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/horsefy/horse')
            .then((response) => {
                setHorseList(response.data);
            });
    }, []);

    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            p={6}
            w={'full'}
            h={'92vh'}
            backgroundImage={'url(/hero.jpg)'}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <Box
                bg={formBackground}
                w={'xl'}
                boxShadow={'md'}
                rounded='2xl'
                p={10}>
                <Formik
                    initialValues={{
                        place: 'Tallinn',
                        date: '',
                        bet: '',
                        horses: [],
                    }}
                    onSubmit={(values, actions) =>
                        axios
                            .post(
                                'http://localhost:8080/api/v1/horsefy/newrace',
                                {
                                    place: values.place,
                                    // Brain gymnastics to get 2 values from checkbox (color, name).
                                    // Stringifies both values and stores them into array,
                                    // Here it maps through the array and returns the parsed JSON string

                                    horses: values.horses.map((horse) => {
                                        return JSON.parse(horse);
                                    }),
                                    date: values.date,
                                    bet: values.bet,
                                }
                            )
                            .then(function (response) {
                                toast({
                                    title: 'Race added.',
                                    description:
                                        'New race has been saved to the database.',
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }>
                    {(props) => (
                        <Form>
                            <Field name='place' validate={validatePlace}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.place &&
                                            form.touched.place
                                        }>
                                        <FormLabel htmlFor='place'>
                                            Place
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            size={'lg'}
                                            id='place'
                                            placeholder='i.e Tallinn'
                                            type={'text'}
                                        />
                                        <FormErrorMessage>
                                            {form.errors.place}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='date' validate={validateDate}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.place &&
                                            form.touched.place
                                        }>
                                        <FormLabel htmlFor='date'>
                                            Date
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            size={'lg'}
                                            id='date'
                                            placeholder='i.e 27.04.2022'
                                            min={
                                                new Date(Date.now())
                                                    .toISOString()
                                                    .split('T')[0]
                                            }
                                            type={'date'}
                                        />
                                        <FormErrorMessage>
                                            {form.errors.date}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='horses'>
                                {({ field, form }) => (
                                    <FormControl
                                        id='horses'
                                        isInvalid={
                                            form.errors.horses &&
                                            form.touched.horses
                                        }>
                                        <FormLabel htmlFor='horses'>
                                            Horses
                                        </FormLabel>
                                        <CheckboxGroup name='horses' isInline>
                                            <SimpleGrid
                                                columns={{
                                                    base: 4,
                                                    md: 4,
                                                    lg: 4,
                                                }}>
                                                {horseList.map((horse) => (
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                horse.color,

                                                            borderRadius: '5px',
                                                            padding: '5px',
                                                            margin: '5px',
                                                        }}
                                                        {...field}>
                                                        <Checkbox
                                                            key={horse.name}
                                                            value={JSON.stringify(
                                                                {
                                                                    name: horse.name,
                                                                    color: horse.color,
                                                                }
                                                            )}
                                                            isChecked={false}>
                                                            {horse.name}
                                                        </Checkbox>
                                                    </div>
                                                ))}
                                            </SimpleGrid>
                                        </CheckboxGroup>

                                        <Text isTruncated>
                                            Add another horse?
                                            <HorseCreator />
                                        </Text>
                                        <FormErrorMessage>
                                            {form.errors.horses}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='bet' validate={validateBet}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.bet && form.touched.bet
                                        }>
                                        <FormLabel htmlFor='bet'>Bet</FormLabel>
                                        <Input
                                            {...field}
                                            size={'lg'}
                                            id='place'
                                            type={'text'}
                                        />
                                        <FormErrorMessage>
                                            {form.errors.bet}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Button
                                mt={4}
                                colorScheme='blue'
                                isLoading={props.isSubmitting}
                                type='submit'>
                                Create a race!
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}

export default RaceFormScreen;
