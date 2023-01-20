import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { runOnJS } from 'react-native-reanimated';

interface PasscodeProviderProps {
  children: ReactNode;
}

interface PasscodeProps {
  input: string[];
  onInputChange(selectedDigit: string): void;
}

const PasscodeContext = createContext({} as PasscodeProps);

const PasscodeProvider = ({ children }: PasscodeProviderProps) => {
  const [input, setInput] = useState<string[]>([]);

  const onInputChange = selectedDigit => {
    if (input.length < 4) {
      setInput(prevInput => [...prevInput, selectedDigit]);
    }
  };

  useEffect(() => {
    if (input.length === 4) {
      setTimeout(() => {
        runOnJS(setInput)([]);
      }, 2000);
    }
  }, [input]);

  return (
    <PasscodeContext.Provider
      value={{
        input: input,
        onInputChange: onInputChange
      }}
    >
      {children}
    </PasscodeContext.Provider>
  );
};

const usePasscode = () => {
  const context = useContext(PasscodeContext);

  return context;
};

export { PasscodeProvider, usePasscode };
