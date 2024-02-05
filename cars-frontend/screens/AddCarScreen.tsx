import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TextField from '../components/TextField';
import PickerSelect from '../components/PickerSelect';
import AppButton from '../components/AppButton';
import useFetchOptions from '../hooks/useFetchOptions';
import getApiUrl from '../utils.js';

export default function AddCarScreen({style, navigation, route}) {
  const apiURL = getApiUrl();
  const [model, setModel] = useState('');
  const [value, setValue] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [transportationCost, setTransportationCost] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [colorOptions] = useFetchOptions(`${apiURL}/colors`);
  const [brandOptions] = useFetchOptions(`${apiURL}/brands`);

  useEffect(() => {
  }, []);

  const addCar = async () => {
    try {
      const response = await fetch(`${apiURL}/cars`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          brand: { _id: selectedBrand },
          color: { _id: selectedColor },
          value: value,
          production_cost: productionCost,
          transportation_cost: transportationCost,
        })
      });
      if (response.status === 201) {
        // TODO: Show success message
      }
    } catch (error) {
      console.error(error);
    } finally {
      navigation.goBack();
      route.params?.onCarAdded();
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height' enabled>
      <ScrollView contentContainerStyle={styles.containerForm} style={{width: '100%', height: '100%', flexGrow: 1, flex: 1}}>
        <Text style={styles.title}>Add Car</Text>
        <TextField
          placeholder='Model'
          label='Model'
          value={model}
          onChangeText={setModel}
          errorMessage='Model is required'
        />
        <PickerSelect
          label='Brand'
          items={brandOptions}
          onValueChange={(value) => setSelectedBrand(value)}
          value={selectedBrand}
          errorMessage='Brand is required'
        />
        <PickerSelect
          label='Main Color'
          items={colorOptions}
          onValueChange={(value) => setSelectedColor(value)}
          value={selectedColor}
          errorMessage='Color is required'
        />
        <TextField
          placeholder='Value'
          label='Value'
          value={value}
          onChangeText={setValue}
          inputMode='numeric'
          errorMessage='Value is required'
        />
        <TextField
          placeholder='Production Cost'
          label='Production Cost'
          value={productionCost}
          onChangeText={setProductionCost}
          inputMode='numeric'
          errorMessage='Production Cost is required'
        />
        <TextField
          placeholder='Transportation Cost'
          label='Transportation Cost'
          value={transportationCost}
          onChangeText={setTransportationCost}
          inputMode='numeric'
          errorMessage='Transportation Cost is required'
        />
        <View style={{marginBottom: 150}}>
          <AppButton onPress={addCar}>
            Save
          </AppButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#213B64',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flex: 1,
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    maxWidth: 600,
    marginTop: 48,
  },
});
