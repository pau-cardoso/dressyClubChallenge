import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import CarRow from '../components/CarRow';
import { Car } from '../models/Car';
import AppButton from '../components/AppButton';

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
      <Text style={styles.title}>List of Cars</Text>
      <AppButton onPress={() => navigation.navigate('AddCar')}>
        Add Car
      </AppButton>
      <View style={styles.tableUpdate}>
        { !isEditing &&
          <AppButton onPress={() => setIsEditing(!isEditing)}>
            Update
          </AppButton>
        }
        { isEditing &&
          <>
            <AppButton onPress={handleSaveChanges}>
              Cancel
            </AppButton>
            <AppButton onPress={handleSaveChanges}>
              Save
            </AppButton>
          </>
        }
      </View>
      <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScrollView}>
        <View style={styles.tableContainer}>
          <View style={[styles.row, styles.headerContainer]}>
            {headers.map((header) => (
              <View style={styles.col} key={header}>
                <Text style={styles.header}>{header}</Text>
              </View>
            ))}
          </View>
          <FlatList
            data={cars}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <CarRow
                isEditing={isEditing}
                car={item}
                key={`car-${index}`}
                onCarPropertyChange={handleCarPropertyChange}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
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
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: '600',
    color: '#626E81',
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
    minWidth: 125,
  },
  headerContainer: {
    backgroundColor: '#EDF4FB',
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
    paddingHorizontal: 4,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  col: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    minWidth: 125,
  },
  tableUpdate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tableContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalScrollView: {
    flexGrow: 1,
  },
});