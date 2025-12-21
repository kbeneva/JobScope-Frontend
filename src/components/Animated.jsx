import { Animated } from "react-native";
import { useRef, useEffect } from "react";

export default function AnimatedFadeSlide({ children, duration = 250 }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [children]);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [
                    {
                        translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                        }),
                    },
                ],
            }}
        >
            {children}
        </Animated.View >
    );
}
