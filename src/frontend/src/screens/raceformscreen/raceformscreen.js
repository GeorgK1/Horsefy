import { Formik, Field, Form } from 'formik';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box,
    Flex,
    Select,
    CheckboxGroup,
    Checkbox,
    useColorModeValue,
    Text,
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

function DisplayHorses(props) {
    if (props.horseList.length === 0) {
        return (
            <Text isTruncated>
                You do not seem to have any horses added. <HorseCreator />
            </Text>
        );
    } else {
        return (
            <>
                <CheckboxGroup name='horses' defaultValue={[]} isInline>
                    <SimpleGrid
                        columns={{ base: 4, md: 4, lg: 4 }}
                       >
                        {props.horseList.map((horse) => (
                            <div
                                style={{
                                    'background-color': horse.color,
                                    width: '100px',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    marginTop: '5px',
                                }}>
                                <Checkbox
                                    key={horse.id}
                                    value={horse.id}
                                    isChecked={false}
                                    colorScheme={horse.color}>
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
            </>
        );
    }
}

function RaceFormScreen() {
    const formBackground = useColorModeValue('white', 'gray.800');
    const [horseList, setHorseList] = useState([]);

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
                    initialValues={{ place: 'Tallinn' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}>
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

                            <Field name='time' validate={validateDate}>
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
                                            {form.errors.time}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <DisplayHorses horseList={horseList} />

                            <Button
                                mt={4}
                                colorScheme='blue'
                                isLoading={props.isSubmitting}
                                disabled={true}
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
