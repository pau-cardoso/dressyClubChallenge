import React, { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TextField from '../components/TextField';
import PickerSelect from '../components/PickerSelect';
import AppButton from '../components/AppButton';

export default function AddCarScreen({style, navigation, route}) {
  const [model, setModel] = useState('');
  const [value, setValue] = useState();
  const [productionCost, setProductionCost] = useState();
  const [transportationCost, setTransportationCost] = useState();
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [brandOptions, setBrandOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    getColors();
    getBrands();
  }, []);

  const getColors = async () => {
    try {
      const response = await fetch(
        'http://localhost:3100/colors',
      );
      const json = await response.json();
      const colors = json.map((color) => {
        return {
          label: color.name,
          value: color._id,
        };
      });
      setColorOptions(colors);
    } catch (error) {
      console.error(error);
    }
  };

  const getBrands = async () => {
    try {
      const response = await fetch(
        'http://localhost:3100/brands',
      );
      const json = await response.json();
      const brands = json.map((brand) => {
        return {
          label: brand.name,
          value: brand._id,
        };
      });
      setBrandOptions(brands);
    } catch (error) {
      console.error(error);
    }
  };

  const addCar = async () => {
    try {
      const response = await fetch(`http://localhost:3100/cars`, {
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
      // TODO: Show error message
    }
    // TODO: Redirect to cars list
  }

  return (
    <ScrollView style={{width: '100%'}} contentContainerStyle={styles.container}>
      <KeyboardAvoidingView style={styles.containerForm} behavior='height' enabled>
        {/* <View style={styles.containerForm}> */}
          <Text style={styles.title}>Add Car</Text>
          <TextField
            label='Model'
            value={model}
            onChangeText={setModel}
          />
          <PickerSelect
            label='Brand'
            items={brandOptions}
            onValueChange={(value) => setSelectedBrand(value)}
            value={selectedBrand}
          />
          <PickerSelect
            label='Main Color'
            items={colorOptions}
            onValueChange={(value) => setSelectedColor(value)}
            value={selectedColor}
          />
          <TextField
            label='Value'
            value={value}
            onChangeText={setValue}
            inputMode='numeric'
          />
          <TextField
            label='Production Cost'
            value={productionCost}
            onChangeText={setProductionCost}
            inputMode='numeric'
          />
          <TextField
            label='Transportation Cost'
            value={transportationCost}
            onChangeText={setTransportationCost}
            inputMode='numeric'
          />
          <AppButton onPress={addCar}>
            Save
          </AppButton>
        {/* </View> */}
      </KeyboardAvoidingView>
    </ScrollView>
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
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
  containerForm: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    gap: 24,
    maxWidth: 600,
    marginTop: 48,
  },
  item: {
    marginBottom: 12,
  }
});