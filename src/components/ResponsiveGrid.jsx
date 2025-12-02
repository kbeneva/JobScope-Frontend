import { View, Platform, useWindowDimensions } from "react-native";
import { createGridStyles } from "../styles/components/gridStyle";

export default function ResponsiveGrid({
  children,
  spacing = 20,
  breakpoints = {
    sm: 1, // < 768px
    md: 2, // 768px - 1023px
    lg: 3, // >= 1024px
  },
  mobileColumns = 1,
}) {
  const gridStyles = createGridStyles;
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const getColumns = () => {
    if (!isWeb) return mobileColumns;
    if (width >= 1024) return breakpoints.lg;
    if (width >= 768) return breakpoints.md;
    return breakpoints.sm;
  };

  const columns = getColumns();
  const items = Array.isArray(children) ? children : [children];

  return (
    <View
      style={[
        gridStyles.container,
        (isWeb || mobileColumns > 1) && gridStyles.grid,
        { gap: spacing },
      ]}
    >
      {items.map((child, index) => (
        <View
          key={child.key || index}
          style={[
            gridStyles.item,
            (isWeb || mobileColumns > 1) && {
              width: `${(100 / columns)}%`,
              flexShrink: 0,
            },
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}
