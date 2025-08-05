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
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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

const features = [
  { icon: 'contrast-circle', label: 'Contrast+', screen: 'ContrastScreen' },
  {
    icon: 'link-variant',
    label: 'Highlight Links',
    screen: 'HighlightLinksScreen',
  },
  { icon: 'format-size', label: 'Bigger Text', screen: 'BiggerTextScreen' },
  {
    icon: 'format-line-spacing',
    label: 'Text Spacing',
    screen: 'TextSpacingScreen',
  },
  {
    icon: 'pause-circle-outline',
    label: 'Pause Animations',
    screen: 'PauseAnimationsScreen',
  },
  { icon: 'alphabetical', label: 'Dyslexia', screen: 'DyslexiaScreen' },
  { icon: 'cursor-default-click', label: 'Cursor', screen: 'CursorScreen' },
  {
    icon: 'format-align-center',
    label: 'Text Align',
    screen: 'TextAlignScreen',
  },
  {
    icon: 'format-line-weight',
    label: 'Line Height',
    screen: 'LineHeightScreen',
  },
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
    icon: isDark ? '#FFFFFF' : '#000000',
  };

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
            <Ionicons name="close" size={24} color={colors.icon} />
          </TouchableOpacity>

          <View
            style={[styles.dragHandle, { backgroundColor: colors.dragHandle }]}
          />

          <Text style={[styles.header, { color: colors.text }]}>
            Accessibility Menu
          </Text>

          {/* Dark Mode Option */}
          <View style={styles.optionRow}>
            <Text style={[styles.optionLabel, { color: colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              value={settings.darkMode}
              onValueChange={val => onChange({ darkMode: val })}
            />
          </View>

          {/* Feature Grid */}
          <ScrollView contentContainerStyle={styles.grid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tile, { backgroundColor: colors.tile }]}
                onPress={() => {
                  onClose();
                  navigation.navigate(feature.screen as never);
                }}
              >
                <MaterialCommunityIcons
                  name={feature.icon as any}
                  size={28}
                  color="#A41CE2"
                />
                <Text style={[styles.label, { color: colors.text }]}>
                  {feature.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Reset Button */}
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <MaterialCommunityIcons
              name="restore" // You can change this icon name
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
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  tile: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 6,
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