import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MisdemeanourContext } from '../utils/context';
import { TMisdemeanour } from '../../types/misdemeanours.types';
import Filter from './Filter';
import RenderCrimes from './RenderCrimes';
import Loading from './Loading';

const Misdemeanours: React.FC = () => {
  const { crimes, setAmount, loading } = useContext(MisdemeanourContext);
  const [selectedMisdemeanour, setSelectedMisdemeanour] = useState('');
  const [filteredCrimes, setFilteredCrimes] = useState<TMisdemeanour[]>([]);

  const { amount } = useParams();

  useEffect(() => {
    amount && setAmount(amount);
    selectedMisdemeanour !== '' &&
      setFilteredCrimes(
        crimes.filter((crime) => crime.misdemeanour === selectedMisdemeanour)
      );
  }, [selectedMisdemeanour]);

  const results = filteredCrimes.length !== 0 ? filteredCrimes : crimes;
  return (
    <>
      <Filter
        selectedMisdemeanour={selectedMisdemeanour}
        setSelectedMisdemeanour={setSelectedMisdemeanour}
      />
      <h1>Misdemeanours</h1>
      {loading && <Loading />}
      {results && <RenderCrimes results={results} />}
      {!loading && crimes && crimes.length === 0 && (
        <li>No results! Please add a number to the url.</li>
      )}
    </>
  );
};

export default Misdemeanours;
