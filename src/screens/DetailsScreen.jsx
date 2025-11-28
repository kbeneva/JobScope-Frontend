import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import JobDetailCard from '../components/JobDetailCard';
import JobTag from "../components/JobTag";

export default function DetailsScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);
  const navigation = useNavigation();

    const job = {
    title: "Data Analyst",
    company: "Microsoft",
    location: "Montreal, Canada",
    postedAgo: "3 days ago",
    pay: "$80 - 90k Yearly",
    jobType: "Full-time",
    remote: "Remote",
    description: `We are looking for a finance professional to join our team to train AI models. You will measure the progress of these AI chatbots, evaluate their logic, and solve problems to improve the quality of each model.\n\nIn this role you will need to hold an expert level of financial reasoning– a completed or in progress Masters/PhD is preferred. Other related fields include, but are not limited to: Financial Accounting, Investment Banking, Wealth Management, and Insurance Planning.\n\nNote: Payment is made via PayPal. We will never ask for any money from you, PayPal will handle any currency conversions from USD. This role is only available for those located in the US, UK, or CA. This is an independent contract position.`
  };

  return (
 <View style={[screenStyles.container, { backgroundColor: theme.background }]}>  
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}> 
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Details of Job Offer</Text>
        <TouchableOpacity>
          <FontAwesome name="bookmark-o" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <JobDetailCard job={job} />

        <View style={[styles.tabRow, { borderBottomColor: theme.border }]}> 
          <View style={[styles.tabActive, { borderBottomColor: theme.primary }]}> 
            <Text style={[styles.tabActiveLabel, { color: theme.primary }]}>Job</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={[styles.tabInactiveLabel, { color: theme.textSecondary }]}>Company</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Job details</Text>
        <View style={styles.detailRow}>
          <MaterialIcons name="attach-money" size={20} color={theme.primary} style={styles.detailIcon}/>
          <JobTag title={job.pay}/>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="work" size={20} color={theme.primary} style={styles.detailIcon}/>
          <Text style={[styles.detailLabel, { backgroundColor: theme.surface, color: theme.textSecondary }]}>{job.jobType}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Full job description</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>{job.description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginRight: 20,
  },
  tabActiveLabel: {
    fontWeight: '600',
  },
  tabInactive: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  tabInactiveLabel: {
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 6,
  },
  detailLabel: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 13,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
});