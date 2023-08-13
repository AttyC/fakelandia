import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { TMisdemeanour, TMisdemeanours } from '../../types/misdemeanours.types';

type MisdemeanourContextType = {
  crimes: TMisdemeanour[];
  loading: boolean;
  error: string;
  setAmount: Dispatch<SetStateAction<string>>;
  setCrimes: Dispatch<SetStateAction<TMisdemeanours>>;
};

type MisdemeanourContextProviderPropsType = {
  children: React.ReactNode[] | React.ReactNode;
};

export const MisdemeanourContext = createContext<MisdemeanourContextType>({
  crimes: [],
  loading: false,
  error: '',
  setAmount: () => {},
  setCrimes: () => {},
});

const MisdemeanourContextProvider = ({
  children,
}: MisdemeanourContextProviderPropsType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [crimes, setCrimes] = useState<TMisdemeanour[]>([]);
  const [amount, setAmount] = useState('');

  const url = `http://localhost:8080/api/misdemeanours/${amount}`;

  useEffect(() => {
    const getMisdemeanours = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setCrimes(result.misdemeanours);
      } catch (error) {
        setError(error as string);
        setLoading(false);
      }
    };
    getMisdemeanours();
  }, [amount]);

  return (
    <MisdemeanourContext.Provider
      value={{
        crimes,
        loading,
        error,
        setAmount,
        setCrimes,
      }}
    >
      {children}
    </MisdemeanourContext.Provider>
  );
};

export default MisdemeanourContextProvider;
