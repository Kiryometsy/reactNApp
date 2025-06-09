import { useTheme } from '@/app/lib/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const progress = useSharedValue(0);

  const iconStyle = useAnimatedStyle(() => {
    // progress goes 0→1 on toggle
    const rotate = `${progress.value * 360}deg`;
    const scale = withTiming(1 + progress.value * 0.2, { duration: 200 });
    return {
      transform: [{ rotate }, { scale }],
    };
  });

  const handlePress = () => {
    // animate: shrink→grow + spin
    progress.value = withSequence(
      withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) }),
      withTiming(0, { duration: 300 })
    );
    toggleTheme();
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.fab, styles.shadow]}
      android_ripple={{ color: 'rgba(0,0,0,0.2)', radius: 28 }}
      hitSlop={8}
    >
      <Animated.View style={iconStyle}>
        <Ionicons
          name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
          size={28}
          color="#fff"
        />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.select({ ios: 0.3, android: 0.5 }),
    shadowRadius: 4,
    elevation: 8,
  },
});