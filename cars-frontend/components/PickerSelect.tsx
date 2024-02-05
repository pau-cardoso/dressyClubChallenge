import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';

interface PickerSelectProps {
  label?: string;
  items: Item[];
  onValueChange: (value: any, index: number) => void;
  value: any;
  errorMessage?: string;
}

export default function PickerSelect({
  label,
  items,
  onValueChange,
  value,
  errorMessage,
}: PickerSelectProps) {
  return (
    <View style={styles.container}>
      {label &&
        <Text style={styles.label}>{label}</Text>
      }
      <RNPickerSelect
        style={pickerSelectStyles}
        items={items}
        onValueChange={onValueChange}
        value={value}
      />
      {errorMessage &&
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
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    width: '100%',
    color: '#486B9A',
  },
  error: {
    marginBottom: 12,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#F8FAFD',
    borderColor: '#F5F7FC',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F8FAFD',
    borderColor: '#F5F7FC',
    color: 'black',
  },
});