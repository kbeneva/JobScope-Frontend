import React,{ useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Alert, Animated } from "react-native";
import { useTheme } from '../styles/theme';
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

export default function Bookmark({ style, isSaved: propIsSaved, onToggle }) {
    const theme = useTheme();
    const iconColor = theme.colors.primary;
    const { user, isAuthenticated } = useUser();

    const [isSaved, setIsSaved] = useState(propIsSaved);
    const [loading, setLoading] = useState(false);
    
    // Animation taille
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    const playAnimation = () => {
        scaleAnim.setValue(1);
        Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        });
    };
    
    
    useEffect(() => {
        if (propIsSaved !== undefined) {
            setIsSaved(propIsSaved);
        }
    }, [propIsSaved]);

    const toggleBookmark = async (e) => {
        e?.stopPropagation?.();
        
        //Animation
        playAnimation();
        
        // // TODO : UNCOMMENT CODE BELLOW WHEN API AVAILABLE
        // if (!isAuthenticated) {
        //     Alert.alert(
        //         "Connexion requise",
        //         "Vous devez être connecté pour sauvegarder une offre",
        //         [{ text: "OK" }]
        //     );
        //     return;
        // }

        if (loading) return;

        const newSavedState = !isSaved;
        
        setIsSaved(newSavedState);
        setLoading(true);

        try {
            // TODO : API CALL - POST OR DELETE FAVORITE

            onToggle?.(jobId, newSavedState);

        } catch (err) {
            console.error("Erreur bookmark:", err);
            
            setIsSaved(!newSavedState);
            
            Alert.alert("Erreur", "Impossible de sauvegarder l'offre");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity 
            onPress={toggleBookmark} 
            disabled={loading}
            style={[{ padding: 4 }, style]}
            activeOpacity={0.6}
        >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={iconColor}
                    style={{ opacity: loading ? 0.5 : 1 }}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};
