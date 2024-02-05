import React from 'react';
import { InputModeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface CarRowProps {
  car: any;
  isEditing?: boolean;
}

export default function CarRow({
  isEditing = false,
  car,
}: CarRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <Text>{car.model}</Text>
      </View>
      <View style={styles.col}>
        <Text>{car.brand.name}</Text>
      </View>
      <View style={styles.col}>
        <Text>{car.color.name}</Text>
      </View>
      <View style={styles.col}>
        <Text>{car.value}</Text>
      </View>
      <View style={styles.col}>
        <Text>{car.production_cost}</Text>
      </View>
      <View style={styles.col}>
        <Text>{car.transportation_cost}</Text>
      </View>
      <View style={styles.col}>
        <Text>{car.transportation_cost + car.production_cost}</Text>
      </View>
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
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 12,
  },
});