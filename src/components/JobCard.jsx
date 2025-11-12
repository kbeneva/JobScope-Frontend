import { View } from "react-native";
import { useTheme } from '../styles/theme';
import { createCardStyles } from "../styles/components/cardStyles";
import JobTag from "./JobTag";

export default function JobCard() {
    const theme = useTheme();
    const styles = createCardStyles(theme);

    return ( 
        <View style={styles.container}>
            <JobTag label='test'/>
        </View>
     );
}