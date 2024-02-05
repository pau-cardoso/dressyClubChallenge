import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextField from './TextField';
import PickerSelect from './PickerSelect';
import useFetchOptions from '../hooks/useFetchOptions';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface CarRowProps {
  car: any;
  isEditing?: boolean;
  onCarPropertyChange?: (carId: string, property: string, value: any) => void;
}

export default function CarRow({
  isEditing = false,
  car,
  onCarPropertyChange,
}: CarRowProps) {
  const [model, setModel] = useState(car.model);
  const [brand, setBrand] = useState(car.brand._id);
  const [color, setColor] = useState(car.color._id);
  const [value, setValue] = useState(String(car.value));
  const [productionCost, setProductionCost] = useState(String(car.production_cost));
  const [transportationCost, setTransportationCost] = useState(String(car.transportation_cost));
  const [colorOptions] = useFetchOptions('http://localhost:3100/colors');
  const [brandOptions] = useFetchOptions('http://localhost:3100/brands');

  useEffect(() => {
  }, []);

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        {isEditing ?
          <TextField
            value={model}
            onChangeText={value => {
              setModel(value);
              onCarPropertyChange(car._id, 'model', value)
            }}
          />
          : <Text style={styles.columnText}>{car.model}</Text>
        }
      </View>
      <View style={styles.col}>
        {isEditing ?
          <PickerSelect
            items={brandOptions}
            value={brand}
            onValueChange={(value) => {
              setBrand(value);
              onCarPropertyChange(car._id, 'brand', value)
            }}
          /> :
          <Text style={styles.columnText}>{car.brand.name}</Text>}
      </View>
      <View style={styles.col}>
        {isEditing ?
          <PickerSelect
            items={colorOptions}
            value={color}
            onValueChange={(value) => {
              setColor(value);
              onCarPropertyChange(car._id, 'color', value);
            }}
          /> :
          <Text style={styles.columnText}>{car.color.name}</Text>}
      </View>
      <View style={styles.col}>
        {isEditing ?
          <TextField
            value={String(value)}
            onChangeText={value => {
              setValue(value);
              onCarPropertyChange(car._id, 'value', value);
            }}
          /> :
          <Text style={styles.columnText}>{USDollar.format(car.value)}</Text>}
      </View>
      <View style={styles.col}>
        {isEditing ?
          <TextField
            value={String(productionCost)}
            onChangeText={value => {
              setProductionCost(value);
              onCarPropertyChange(car._id, 'production_cost', value);
            }}
          /> :
          <Text style={styles.columnText}>{USDollar.format(car.production_cost)}</Text>}
      </View>
      <View style={styles.col}>
        {isEditing ?
          <TextField
            value={String(transportationCost)}
            onChangeText={value => {
              setTransportationCost(value);
              onCarPropertyChange(car._id, 'transportation_cost', value);
            }}
          /> :
          <Text style={styles.columnText}>{USDollar.format(car.transportation_cost)}</Text>}
      </View>
      <View style={styles.col}>
        <Text style={styles.columnText}>{
          USDollar.format(
            parseInt(transportationCost)
            + parseInt(productionCost)
          )}
        </Text>
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
    borderBottomColor: '#F5F7F9',
    borderBottomWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 8,
  },
  col: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    minWidth: 125,
  },
  columnText: {
    color: '#5D6B7E',
    fontSize: 16,
  },
});