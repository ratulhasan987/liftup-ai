import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

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

const textAlignOptions: ('left' | 'center' | 'right')[] = [
  'left',
  'center',
  'right',
];

const AccessibilityModal: React.FC<Props> = ({
  visible,
  onClose,
  settings,
  onChange,
  onReset,
}) => {
  const navigation = useNavigation();
  const isDark = settings.darkMode;

  const colors = {
    background: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    tile: isDark ? '#2E2E2E' : '#FFFFFF',
    dragHandle: isDark ? '#666' : '#ccc',
  };

  const cycleTextAlign = () => {
    const currentIndex = textAlignOptions.indexOf(settings.textAlign);
    const nextIndex = (currentIndex + 1) % textAlignOptions.length;
    onChange({ textAlign: textAlignOptions[nextIndex] });
  };

  const features = [
    {
      label: 'Dark Mode',
      control: (
        <Switch
          value={settings.darkMode}
          onValueChange={val => onChange({ darkMode: val })}
        />
      ),
    },
    {
      label: 'Line Height',
      control: (
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() =>
              onChange({ lineHeight: Math.max(14, settings.lineHeight - 2) })
            }
            style={[styles.controlBtn, { borderColor: colors.text }]}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.controlValue, { color: colors.text }]}>
            {settings.lineHeight.toFixed(1)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              onChange({ lineHeight: Math.min(40, settings.lineHeight + 2) })
            }
            style={[styles.controlBtn, { borderColor: colors.text }]}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>＋</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      label: 'Letter Spacing',
      control: (
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() =>
              onChange({
                letterSpacing: Math.max(0, settings.letterSpacing - 0.5),
              })
            }
            style={[styles.controlBtn, { borderColor: colors.text }]}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.controlValue, { color: colors.text }]}>
            {settings.letterSpacing.toFixed(1)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              onChange({
                letterSpacing: Math.min(5, settings.letterSpacing + 0.5),
              })
            }
            style={[styles.controlBtn, { borderColor: colors.text }]}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>＋</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      label: 'Text Align',
      control: (
        <TouchableOpacity
          style={[styles.textAlignBtn, { borderColor: colors.text }]}
          onPress={cycleTextAlign}
          activeOpacity={0.7}
        >
          <Text style={{ color: colors.text, fontWeight: '600' }}>
            {settings.textAlign.charAt(0).toUpperCase() +
              settings.textAlign.slice(1)}
          </Text>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={onClose}
        style={styles.overlay}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          <View
            style={[styles.dragHandle, { backgroundColor: colors.dragHandle }]}
          />

          <Text style={[styles.header, { color: colors.text }]}>
            Accessibility Menu
          </Text>
          <ScrollView contentContainerStyle={styles.grid}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={[styles.tile, { backgroundColor: colors.tile }]}
              >
                <View style={{ marginBottom: 6 }}>{feature.control}</View>
                <Text style={[styles.label, { color: colors.text }]}>
                  {feature.label}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Reset Button */}
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <Ionicons
              name="refresh"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.resetText}>Reset All Accessibility</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AccessibilityModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000040',
  },
  container: {
    height: height * 0.65,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 2,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  tile: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    // subtle border to enhance tile separation
    borderWidth: 1,
    borderColor: 'rgba(164, 28, 226, 0.15)',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: '#555',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    // borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlValue: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 28,
    textAlign: 'center',
  },
  textAlignBtn: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: '#A41CE2',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
