import { Text, TouchableOpacity } from 'proton-native';

import React from 'react';

export default function CircleButton({
  children,
  backgroundColor,
  width,
  start,
  color,
  size,
  onPress
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor,
        borderRadius: 40,
        height: 80,
        width: width || 80,
        alignItems: start ? 'flex-start' : 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color,
          fontSize: size,
          marginLeft: start ? 25 : 0,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
