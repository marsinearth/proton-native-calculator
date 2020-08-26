import Buttons, { buttonStyle } from './Buttons';
import React, { useState } from 'react';
import { Text, View } from 'proton-native';

const initialState = {
  secondary: 0,
  primary: 0,
  operator: '',
  justChanged: false,
  decimal: false,
};

export default function Calculator() {
  const [state, setState] = useState(initialState);
  const primary = Number(state.primary);

  return (
    <>
      <View style={calculatorStyle.panel}>
        <Text style={calculatorStyle.panelText}>
          {primary.toString().length >= 7
            ? primary.toExponential(4)
            : primary
          }
        </Text>
      </View>
      <Buttons {...state} setState={setState} />
    </>
  )
}

const calculatorStyle = {
  panel: {
    width: '100%',
    height: '30%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  panelText: {
    color: 'white',
    fontSize: 80,
    textAlign: 'right',
    marginRight: 35,
    marginBottom: 15,
    fontWeight: 200,
  }
}
