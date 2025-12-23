import { useTheme } from "../styles/theme";
import { View, Text, TouchableOpacity } from "react-native";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { createAnalyticsStyles } from "../styles/screens/analyticsStyles";
import DashboardA from "../components/DashboardA";
import DashboardB from "../components/DashboardB";
import { useState } from "react";
import AnimatedFadeSlide from "../components/Animated";

export default function MarketScreen() {
  const theme = useTheme();
  const styles = createScreenStyles(theme);
  const analyticsStyles = createAnalyticsStyles(theme);

  const [activeTab, setActiveTab] = useState("dashboardA");

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View>
        <Text style={analyticsStyles.title}>
          Analysis and Information on the Current Job Market
        </Text>

        <View style={analyticsStyles.tabContainer}>
          <TouchableOpacity
            style={[
              analyticsStyles.tab,
              activeTab === "dashboardA" && analyticsStyles.activeTab,
            ]}
            onPress={() => setActiveTab("dashboardA")}
          >
            <Text
              style={[
                analyticsStyles.tabText,
                activeTab === "dashboardA"
                  ? analyticsStyles.activeText
                  : analyticsStyles.inactiveText,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              analyticsStyles.tab,
              activeTab === "dashboardB" && analyticsStyles.activeTab,
            ]}
            onPress={() => setActiveTab("dashboardB")}
          >
            <Text
              style={[
                analyticsStyles.tabText,
                activeTab === "dashboardB"
                  ? analyticsStyles.activeText
                  : analyticsStyles.inactiveText,
              ]}
            >
              By Domain
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AnimatedFadeSlide>
        {activeTab === "dashboardA" ? <DashboardA /> : <DashboardB />}
      </AnimatedFadeSlide>
    </View>
  );
}
