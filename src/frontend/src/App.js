import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import HomeScreen from './screens/homescreen/homescreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RaceScreen from './screens/racescreen/racescreen';
import RaceFormScreen from './screens/raceformscreen/raceformscreen';
import Nav from './components/navbar/navbar';
import ResultScreen from './screens/resultscreen/resultscreen';
import HorseScreen from './screens/horsescreen/horsescreen';
function App() {
    return (
        <div className='App'>
            <ChakraProvider>
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route path='/' element={<HomeScreen />}></Route>
                        <Route path='/racing' element={<RaceScreen />}></Route>
                        <Route
                            path='/raceform'
                            element={<RaceFormScreen />}></Route>
                        <Route path='/results' element={<ResultScreen/>}></Route>
                        <Route path= '/horses' element={<HorseScreen/>}></Route>
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </div>
    );
}

export default App;
