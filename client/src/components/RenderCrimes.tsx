import { useContext } from 'react';
import { MisdemeanourContext } from '../utils/context';
import { TMisdemeanour } from '../../types/misdemeanours.types';
import Misdemeanour from './Misdemeanour';
import Loading from './Loading';

interface RenderCrimesProps {
  results: Array<TMisdemeanour>;
}

const RenderCrimes: React.FC<RenderCrimesProps> = ({ results }) => {
  const { loading } = useContext(MisdemeanourContext);
  return (
    <>
      {!loading && results && (
        <table className='table-auto border-2 border-red-100'>
          <thead>
            <tr>
              <th>Citizen ID</th>
              <th>Date</th>
              <th>Misdemeanour</th>
              <th>Punishment Idea</th>
            </tr>
          </thead>
          <tbody>
            {results.map((crime) => (
              <Misdemeanour crime={crime} />
            ))}
          </tbody>
        </table>
      )}
      {loading && <Loading />}
    </>
  );
};

export default RenderCrimes;
