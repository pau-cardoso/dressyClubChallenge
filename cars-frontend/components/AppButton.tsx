import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AppButtonProps {
  children: React.ReactNode;
  onPress: any;
}

export default function AppButton({
  children,
  onPress,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.secondaryBtn}
    >
      <Text style={styles.btnText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  secondaryBtn: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});