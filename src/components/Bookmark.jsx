import React,{ useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useTheme } from '../styles/theme';
import { Ionicons } from "@expo/vector-icons";

export default function Bookmark({ userId = 1, jobId, style, isSaved: propIsSaved }) {
    const theme = useTheme();
    const iconColor = theme.colors.primary;

    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const displaySaved = propIsSaved !== undefined ? propIsSaved : isSaved;

    const toggleBookmark = async () => {
        if (!userId) {
            // TODO: change to modal
            Alert.alert(
                "Connection required!",
                "You need to be authenticated to save a job",
                [{ text: "OK" }]
            );
            return;
        }

        setLoading(true);

        try {
            // TODO: change when API available
            await new Promise(resolve => setTimeout(resolve, 300));

            setIsSaved(prev => !prev);

        } catch (err) {
            console.log("Erreur bookmark:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Pressable onPress={toggleBookmark} disabled={loading} style={[{ padding: 4 }, style]}>
            <Ionicons
                name={displaySaved ? "bookmark" : "bookmark-outline"}
                size={24}
                color={iconColor}
            />
        </Pressable>
    );
};