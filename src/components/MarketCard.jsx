import { View } from "react-native";
import { useTheme } from "../styles/theme";
import { createCardStyles } from "../styles/components/cardStyles";

export default function MarketCard({ children, outlined = false }) {
    const theme = useTheme();
    const styles = createCardStyles(theme, outlined);

    return <View style={styles.card}>{children}</View>;
}
