// components/Accordion.js
import { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../styles/theme";
import { createSearchBarStyles } from "../styles/components/searchBarStyles";

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const styles = createSearchBarStyles(theme);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={toggle}
                style={styles.accordionHeader}
                activeOpacity={0.8}
            >
                <Text style={[styles.accordionTitle, { color: theme.colors.textPrimary }]}>
                    {title}
                </Text>

                <FontAwesome
                    name={open ? "minus" : "plus"}
                    size={16}
                    color={theme.colors.textSecondary}
                />

            </TouchableOpacity>

            {open && (
                <View style={styles.accordionContent}>
                    {children}
                </View>
            )}
        </View>
    );
}