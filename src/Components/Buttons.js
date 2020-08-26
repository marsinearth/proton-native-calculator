import React, { useCallback, useMemo } from 'react';

import CircleBtn from './CircleButton';
import { View } from 'proton-native';

export default function Buttons({
  primary,
  secondary,
  setState,
  decimal,
  operator,
  justChanged
}) {
  console.log({
    primary,
    secondary,
    decimal,
    operator,
    justChanged
  });

  const addDigit = useCallback((new_digit) => {
    if (justChanged) {
      if (decimal) {
        setState(prev => ({
          ...prev,
          secondary: primary,
          primary: new_digit / 10,
          justChanged: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          secondary: primary,
          primary: new_digit,
          justChanged: false,
        }));
      }
    } else if (!decimal) {
      setState(prev => ({
        ...prev,
        primary: 10 * primary + new_digit,
      }));
    } else if (decimal) {
      if (primary.toString().indexOf('.') == -1) {
        setState(prev => ({
          ...prev,
          primary: parseFloat(
            primary.toString() + '.' + new_digit.toString()
          ),
        }));
      } else {
        setState(prev => ({
          ...prev,
          primary: parseFloat(
            primary.toString() + new_digit.toString()
          ),
        }));
      }
    }
  }, [justChanged, primary, decimal]);

  const changeOperator = useCallback((new_operator) => {
    if (operator === '+') {
      setState(prev => ({
        ...prev,
        decimal: false,
        secondary: 0,
        primary: secondary + primary,
        operator: new_operator,
        justChanged: true,
      }));
    } else if (operator === '-') {
      setState(prev => ({
        ...prev,
        decimal: false,
        secondary: 0,
        primary: secondary - primary,
        operator: new_operator,
        justChanged: true,
      }));
    } else if (operator === '/') {
      setState(prev => ({
        ...prev,
        decimal: false,
        secondary: 0,
        primary: secondary / primary,
        operator: new_operator,
        justChanged: true,
      }));
    } else if (operator === '*') {
      setState(prev => ({
        ...prev,
        decimal: false,
        secondary: 0,
        primary: secondary * primary,
        operator: new_operator,
        justChanged: true,
      }));
    } else {
      setState(prev => ({ ...prev, decimal: false, operator: new_operator, justChanged: true }));
    }
  }, [operator, primary, secondary]);

  const buttons = useMemo(() => ([
    [
      {
        text: 'AC',
        type: 'secondary',
        onPress: () =>
          setState({
            primary: 0,
            secondary: 0,
            operator: '',
            decimal: false,
            justChanged: false,
          }),
      },
      {
        text: '+/-',
        type: 'secondary',
        onPress: () => setState(prev => ({ ...prev, primary: -primary })),
      },
      {
        text: '%',
        type: 'secondary',
        onPress: () =>
          setState(prev => ({
            ...prev,
            primary: primary / 100,
          })),
      },
      {
        text: '÷',
        type: 'primary',
        onPress: () => changeOperator('/'),
      },
    ],
    [
      {
        text: '7',
        type: 'number',
        onPress: () => addDigit(7),
      },
      {
        text: '8',
        type: 'number',
        onPress: () => addDigit(8),
      },
      {
        text: '9',
        type: 'number',
        onPress: () => addDigit(9),
      },
      {
        text: '×',
        type: 'primary',
        onPress: () => changeOperator('*'),
      },
    ],
    [
      {
        text: '4',
        type: 'number',
        onPress: () => addDigit(4),
      },
      {
        text: '5',
        type: 'number',
        onPress: () => addDigit(5),
      },
      {
        text: '6',
        type: 'number',
        onPress: () => addDigit(6),
      },
      {
        text: '-',
        type: 'primary',
        onPress: () => changeOperator('-'),
      },
    ],
    [
      {
        text: '1',
        type: 'number',
        onPress: () => addDigit(1),
      },
      {
        text: '2',
        type: 'number',
        onPress: () => addDigit(2),
      },
      {
        text: '3',
        type: 'number',
        onPress: () => addDigit(3),
      },
      {
        text: '+',
        type: 'primary',
        onPress: () => changeOperator('+'),
      },
    ],
    [
      {
        text: '0',
        type: 'number',
        width: 185,
        start: true,
        onPress: () => addDigit(0),
      },
      {
        text: '.',
        type: 'number',
        onPress: () => setState(prev => ({ ...prev, decimal: true }))
      },
      {
        text: '=',
        type: 'primary',
        onPress: () => changeOperator('+'),
      },
    ],
  ]), [addDigit, changeOperator, primary]);

  return (
    <>
      {buttons.map((btnGroups, i1) => (
        <View key={`${i1}`} style={buttonContainer}>
          {btnGroups.map(({ type, text, ...rest }, i2) => (
            <CircleBtn
              key={`${i1}${i2}`}
              {...buttonStyle[type]}
              {...rest}
            >
              {text}
            </CircleBtn>
          ))}
        </View>
      ))}
    </>
  );
};

const buttonContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
};

const buttonStyle = {
  primary: {
    backgroundColor: '#FC9E34',
    color: 'white',
    size: 40,
  },
  secondary: {
    backgroundColor: '#A4A4A4',
    color: '#010101',
    size: 30,
  },
  number: {
    backgroundColor: '#363636',
    color: 'white',
    size: 40,
  },
};