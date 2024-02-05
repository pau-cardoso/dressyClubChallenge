import React from 'react';
import { InputModeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface TextFieldProps {
  label?: string;
  onChangeText: any;
  value: any;
  errorMessage?: string;
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
      { label &&
        <Text style={styles.label}>{label}</Text>
      }
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        inputMode={inputMode}
        testID='text-input'
      />
      { errorMessage &&
        <Text style={styles.error}>{errorMessage}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 16,
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    width: '100%',
    color: '#486B9A',
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 4,
    borderColor: '#F5F7FC',
    backgroundColor: '#F8FAFD',
    fontSize: 16,
    color: '#000',
  },
  error: {
    marginBottom: 12,
  }
});