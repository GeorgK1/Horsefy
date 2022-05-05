import { Formik, Form, useField, ErrorMessage } from 'formik';
import {
    Input,
    Button,
    Box,
    Flex,
    Text,
    CheckboxGroup,
    Checkbox,
    useColorModeValue,
    SimpleGrid,
    createStandaloneToast,
} from '@chakra-ui/react';
import HorseCreator from '../../components/horsecreator/horsecreator';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { object, string, date, array } from 'yup';

function handleFormSubmit(values, actions) {
    const toast = createStandaloneToast();
    axios
        .post('http://localhost:8080/api/v1/horsefy/races/', {
            place: values.place,
            // Brain gymnastics to get 2 values from checkbox (color, name).
            // Stringifies both values and stores them into array,
            // Here it maps through the array and returns the parsed JSON string

            horses: values.horses.map((horse) => {
                return JSON.parse(horse);
            }),
            date: values.date,
            bet: values.bet,
        })
        .then(() => {
            toast({
                title: 'Race added.',
                description: 'New race has been saved to the database.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            actions.setSubmitting(false);
        })
        .catch((error) => {
            toast({
                title: 'Error has occured.',
                description: error.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
}

function PlaceField() {
    const [field] = useField('place');

    return (
        <>
            <label>Place</label>
            <Input
                {...field}
                size={'lg'}
                id='place'
                placeholder='i.e Tallinn'
                type={'text'}
            />
            <ErrorMessage name={field.name} component='div' />
        </>
    );
}

//yup validation schema
const raceValidation = object().shape({
    place: string()
        .min(2, 'Too short')
        .strict()
        .max(20, 'Too long')
        .required('Place is required'),
    date: date().required('Date is required'),
    bet: string().required('Bet is required'),
    horses: array().min(2, 'You need at least 2 horses'),
});

function DateField() {
    const [field] = useField('date');

    return (
        <>
            <label>Date</label>
            <Input
                {...field}
                size={'lg'}
                id='date'
                placeholder='i.e 27.04.2022'
                min={new Date(Date.now()).toISOString().split('T')[0]}
                type={'date'}
            />
            <ErrorMessage name={field.name} component='div' />
        </>
    );
}

function HorsesField(props) {
    const [field] = useField('horses');

    if (props.horseList.length === 0) {
        return (
            <Text isTruncated my={5}>
                No horses available.
                <HorseCreator />
            </Text>
        );
    }

    return (
        <>
            <label>Horses</label>
            <CheckboxGroup name='horses' isInline>
                <SimpleGrid
                    columns={{
                        base: 4,
                        md: 4,
                        lg: 4,
                    }}>
                    {props.horseList.map((horse) => (
                        <div
                            key={horse.id}
                            style={{
                                backgroundColor: horse.color,

                                borderRadius: '5px',
                                padding: '5px',
                                margin: '5px',
                            }}
                            {...field}>
                            <Checkbox
                                {...field}
                                key={horse.name}
                                value={JSON.stringify({
                                    name: horse.name,
                                    color: horse.color,
                                })}
                                isChecked={false}>
                                {horse.name}
                            </Checkbox>
                        </div>
                    ))}
                </SimpleGrid>
                <ErrorMessage name={field.name} component='div' />
                <Text isTruncated my={5}>
                    Add another horse?
                    <HorseCreator />
                </Text>
            </CheckboxGroup>
        </>
    );
}

function BetField(props) {
    const [field] = useField('bet');

    return (
        <>
            <label>Your bet</label>
            <Input {...field} {...props} size={'lg'} id='place' type={'text'} />
            <ErrorMessage name={field.name} component='div' />
        </>
    );
}

function RaceFormScreen() {
    const formBackground = useColorModeValue('white', 'gray.800');
    const [horseList, setHorseList] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/horsefy/horses').then((response) => {
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
                    validationSchema={raceValidation}
                    onSubmit={handleFormSubmit}>
                    {(props) => (
                        <Form>
                            <PlaceField />

                            <DateField />

                            <HorsesField horseList={horseList} />

                            <BetField />

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
