import { View, Text } from "react-native";
import { useTheme } from '../styles/theme';
import { createCardStyles } from "../styles/components/cardStyles";
import JobTag from "./JobTag";
import Bookmark from './Bookmark';
import { Ionicons } from "@expo/vector-icons";

export default function JobCard({ job }) {
    const theme = useTheme();
    const styles = createCardStyles(theme);
    const iconColor = theme.colors.primary;

    return (
        <View style={[styles.container, { position: 'relative'}]}>
            <Bookmark style={{ position: 'absolute', right: 10, top: 10 }} />

            <Text style={styles.title}>{job.title}</Text>
            <Text style={[styles.info, styles.company]}>Company</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.xl }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="location-sharp" size={24} color={iconColor} />
                    <Text style={styles.info}>{job.location}</Text>
                </View>
                <Text style={styles.info}>{job.publishedTime}</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}
            >
                 {job.jobType && (
                    <JobTag
                        label={job.jobType}
                    />
                )}

                {job.salary && (
                    <JobTag
                        label={job.salary}
                    />
                )}

                {job.tags?.map((tag, index) => (
                    <JobTag
                        key={index}
                        label={tag}
                    />
                ))}
            </View>
        </View>
    );
}