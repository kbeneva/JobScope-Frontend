import { View, Text } from "react-native";
import { useTheme } from '../styles/theme';
import { createCardStyles } from "../styles/components/cardStyles";
import JobTag from "./JobTag";
import Bookmark from './Bookmark';
import { Ionicons } from "@expo/vector-icons";

export default function JobCard() {
    const theme = useTheme();
    const styles = createCardStyles(theme);
    const iconColor = theme.colors.primary;

    return (
        <View style={[styles.container, { position: 'relative', marginBottom: theme.spacing.xl }]}>
            <Bookmark style={{ position: 'absolute', right: 10, top: 10 }} />

            <Text style={styles.title}>Job title</Text>
            <Text style={[styles.info, styles.company]}>Company</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.xl }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="location-sharp" size={24} color={iconColor} />
                    <Text style={styles.info}>Location</Text>
                </View>
                <Text style={styles.info}>x days ago</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}
            >
                <JobTag
                    label="Full-time"
                    style={{ minWidth: '45%' }}
                />
            </View>
        </View>
    );
}