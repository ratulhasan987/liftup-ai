import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  settings: {
    darkMode: boolean;
    lineHeight: number;
    letterSpacing: number;
    textAlign: 'left' | 'center' | 'right';
  };
  onChange: (newSettings: Partial<Props['settings']>) => void;
  onReset: () => void;
}

const AccessibilityModal: React.FC<Props> = ({
  visible,
  onClose,
  settings,
  onChange,
  onReset,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>Accessibility Menu</Text>

          <View style={styles.option}>
            <Text style={styles.optionLabel}>Dark Mode</Text>
            <Switch
              value={settings.darkMode}
              onValueChange={val => onChange({ darkMode: val })}
            />
          </View>

          <View style={styles.option}>
            <Text style={styles.optionLabel}>Line Height</Text>
            <TouchableOpacity onPress={() => onChange({ lineHeight: 22 })}>
              <Text style={styles.button}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange({ lineHeight: 32 })}>
              <Text style={styles.button}>Wide</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.option}>
            <Text style={styles.optionLabel}>Letter Spacing</Text>
            <TouchableOpacity onPress={() => onChange({ letterSpacing: 0 })}>
              <Text style={styles.button}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange({ letterSpacing: 2 })}>
              <Text style={styles.button}>Wide</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.option}>
            <Text style={styles.optionLabel}>Text Align</Text>
            <TouchableOpacity onPress={() => onChange({ textAlign: 'left' })}>
              <Text style={styles.button}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange({ textAlign: 'center' })}>
              <Text style={styles.button}>Center</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange({ textAlign: 'right' })}>
              <Text style={styles.button}>Right</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
            <Text style={styles.resetText}>Reset All Accessibility</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AccessibilityModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  option: {
    marginVertical: 8,
  },
  optionLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  button: {
    color: '#A41CE2',
    fontWeight: '600',
    marginTop: 4,
  },
  resetBtn: {
    marginTop: 20,
    backgroundColor: '#A41CE2',
    padding: 12,
    borderRadius: 30,
  },
  resetText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: 10,
  },
  closeText: {
    textAlign: 'center',
    color: '#666',
  },
});
