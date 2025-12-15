import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../styles/theme";
import { createCardStyles } from "../styles/components/jobCardStyles";
import JobTag from "./JobTag";
import Bookmark from "./Bookmark";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function JobCard({ job }) {
    const theme = useTheme();
    const styles = createCardStyles(theme);
    const navigation = useNavigation();

    if (!job) {
        return null;
    }

    const handlePress = () => {
        navigation.navigate('Details', {
            jobId: job._id || job.id
        });
    };

    return (
        <TouchableOpacity
            style={[styles.container, { position: "relative" }]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Bookmark
                style={{ position: "absolute", right: 10, top: 10, zIndex: 10 }}
                isSaved={job.isFavorite}
            />

            <Text style={styles.title}>{job.title}</Text>
            <Text style={[styles.info, styles.company]}>{job.company}</Text>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: theme.spacing.xl,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                        name="location-sharp"
                        size={24}
                        color={theme.colors.primary}
                    />
                    <Text style={styles.info}>{job.location}</Text>
                </View>
                <Text style={styles.info}>{job.publishedTime}</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: 8,
                }}
            >
                {job.jobType && <JobTag label={job.jobType} />}

                {job.salary && <JobTag label={job.salary} />}

                {job.tags?.map((tag, index) => (
                    <JobTag key={index} label={tag} />
                ))}
            </View>
        </TouchableOpacity>
    );
}
