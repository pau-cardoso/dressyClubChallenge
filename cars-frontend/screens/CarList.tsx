import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import CarRow from '../components/CarRow';
import { Car } from '../models/Car';

export default function CarList({style, navigation, route}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedCars, setModifiedCars] = useState<string[]>([]);

  const headers: string[] = [
    'Model',
    'Brand',
    'Main Color',
    'Value',
    'Production Cost',
    'Transportation Cost',
    'Total',
  ];

  useEffect(() => {
    getCars();
  }, []);

  const handleCarPropertyChange = (carId, property, value) => {
    if (!modifiedCars.includes(carId)) {
      modifiedCars.push(carId);
    }
    cars.find((car) => car._id === carId)[property] = value;
  };

  const getCars = async () => {
    try {
      const response = await fetch(
        'http://localhost:3100/cars',
      );
      const json = await response.json();
      setCars(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      modifiedCars.forEach(async carId => {
        let modifiedCar = cars.find((car) => car._id === carId);
        delete modifiedCar._id;
        const response = await fetch(`http://localhost:3100/cars/${carId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modifiedCar),
        });
        modifiedCar = await response.json();
      });
    } catch (error) {
      console.error(error);
    } finally {
      getCars();
      setModifiedCars([]);
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car List</Text>
      <Button
        title="Add Car"
        onPress={() => navigation.navigate('AddCar')}
      />
      <Button
        title="Modify"
        onPress={() => setIsEditing(!isEditing)}
      />
      <Button
        title="Save Changes"
        onPress={handleSaveChanges}
      />
      <View style={styles.row}>
        {headers.map((header) => (
          <View style={styles.col} key={header}>
            <Text style={styles.header}>{header}</Text>
          </View>
        ))}
      </View>
      {cars.map((car, index) => (
        <CarRow
          isEditing={isEditing}
          car={car}
          key={`car-${index}`}
          onCarPropertyChange={handleCarPropertyChange}
        />
      ))}
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    fontWeight: '600',
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