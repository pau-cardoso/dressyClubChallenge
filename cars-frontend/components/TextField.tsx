import React from 'react';
import { InputModeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface TextFieldProps {
  label: string;
  onChangeText: any;
  value: any;
  errorMessage: string;
  inputMode?: InputModeOptions;
}

export default function TextField({
  label,
  onChangeText,
  value,
  errorMessage,
  inputMode,
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        inputMode={inputMode}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 4,
    fontSize: 16,
  },
  error: {
    marginBottom: 12,
  }
});