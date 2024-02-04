import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TextField from '../components/TextField';
import PickerSelect from '../components/PickerSelect';

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
    <View style={styles.container}>
      <Text style={styles.title}>Add Car Screen</Text>
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
      <Button
        onPress={addCar}
        title="Save"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    width: '80%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 12,
  }
});