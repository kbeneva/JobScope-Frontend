import { useTheme } from "../styles/theme";
import { useState } from "react";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView, Switch } from "react-native";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, isAuthenticated, updateUser } = useUser();
  const screenStyles = createScreenStyles(theme);


  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [biography, setBiography] = useState(user?.biography || "");
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [interest, setInterest] = useState(user?.interest || "");

  const openEdit = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
    setBiography(user?.biography || "");
    setInterest(user?.interest || "");
    setIsEditing(true);
  };

  const onSave = async () => {
    await updateUser({ firstName, lastName, email, biography, interest });
    setIsEditing(false);
  };

  //mock données pour le test
  const savedJobs = [
    {
      id: "1",
      title: "UX Designer",
      company: "Google",
      location: "Laval, Canada",
      posted: "5 days ago",
      salary: "$60 – 70k Yearly",
      type: "Part-time",
      mode: "Hybrid",
      bookmarked: true,
    },
    {
      id: "2",
      title: "IT Manager",
      company: "Google",
      location: "Laval, Canada",
      posted: "5 days ago",
      salary: "$60 – 70k Yearly",
      type: "Part-time",
      mode: "Hybrid",
      bookmarked: true,
    },
    {
      id: "3",
      title: "AI Engineer",
      company: "Google",
      location: "Laval, Canada",
      posted: "5 days ago",
      salary: "$60 – 70k Yearly",
      type: "Part-time",
      mode: "Hybrid",
      bookmarked: true,
    },
  ];
  return (
    <View style={screenStyles.container}>
      <View style={{ alignItems: "center", marginTop: theme.spacing.lg }}>
        <Image
          source={{ uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" }}
          style={{ width: 96, height: 96, borderRadius: 48, marginBottom: theme.spacing.md }}
        />
        <Text style={styles(theme).name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles(theme).email}>{user?.email}</Text>

        <TouchableOpacity onPress={openEdit} style={styles(theme).button}>
          <Text style={styles(theme).buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Text style={styles(theme).bio}>{user?.biography}</Text>
        {user?.interest ? (
          <Text style={[styles(theme).bio, { marginTop: 8 }]}>{user.interest}</Text>
        ) : null}
      </View>

      <View style={styles(theme).sectionList}>
        <TouchableOpacity style={styles(theme).row} onPress={() => setIsSavedOpen(true)}>
          <View style={styles(theme).rowLeft}>
            <Ionicons name="bookmark" size={22} color={theme.colors.iconPrimary} />
            <Text style={styles(theme).rowText}>Saved</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.iconSecondary} />
        </TouchableOpacity>

        <View style={styles(theme).divider} />

        <TouchableOpacity style={styles(theme).row} onPress={() => setIsSettingsOpen(true)}>
          <View style={styles(theme).rowLeft}>
            <Ionicons name="settings-outline" size={22} color={theme.colors.iconPrimary} />
            <Text style={styles(theme).rowText}>Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.iconSecondary} />
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal visible={isEditing} animationType="slide" transparent>
        <View style={styles(theme).modalBackdrop}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles(theme).modalCard}>
            <View style={styles(theme).modalHeader}>
              <TouchableOpacity onPress={() => setIsEditing(false)} style={styles(theme).iconBtn}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles(theme).title}>Edit Profile</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 4 }}>
              <Text style={styles(theme).label}>First Name</Text>
              <TextInput value={firstName} onChangeText={setFirstName} placeholder="John" placeholderTextColor={theme.colors.textSecondary} style={styles(theme).input} />

              <Text style={styles(theme).label}>Last Name</Text>
              <TextInput value={lastName} onChangeText={setLastName} placeholder="Doe" placeholderTextColor={theme.colors.textSecondary} style={styles(theme).input} />

              <Text style={styles(theme).label}>Email</Text>
              <TextInput value={email} onChangeText={setEmail} placeholder="johndoe@jobscope.com" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={theme.colors.textSecondary} style={styles(theme).input} />

              <Text style={styles(theme).label}>Bio</Text>
              <TextInput value={biography} onChangeText={(t) => t.length <= 250 && setBiography(t)} placeholder="Write something about you..." placeholderTextColor={theme.colors.textSecondary} style={[styles(theme).input, { height: 110, textAlignVertical: "top" }]} multiline />
              <Text style={styles(theme).label}>Interests</Text>
              <TextInput
                value={interest}
                onChangeText={setInterest}
                placeholder="Web Development, Cloud Computing, DevOps"
                placeholderTextColor={theme.colors.textSecondary}
                style={styles(theme).input}
              />

            </ScrollView>

            <TouchableOpacity onPress={onSave} style={styles(theme).saveBtn}>
              <Text style={styles(theme).saveText}>Save changes</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      {/* Saved Modal */}
      <Modal visible={isSavedOpen} animationType="slide" transparent>
        <View style={styles(theme).modalBackdrop}>
          <View style={styles(theme).savedCard}>
            <View style={styles(theme).savedHeader}>
              <TouchableOpacity onPress={() => setIsSavedOpen(false)} style={styles(theme).iconBtn}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles(theme).title}>Saved</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="chevron-back-outline" size={18} color={theme.colors.iconSecondary} />
                <Text style={styles(theme).pagerText}> 1 of {savedJobs.length} </Text>
                <Ionicons name="chevron-forward-outline" size={18} color={theme.colors.iconSecondary} />
              </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
              {savedJobs.map((job) => (
                <View key={job.id} style={styles(theme).jobCard}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles(theme).jobTitle}>{job.title}</Text>
                    <Ionicons
                      name={job.bookmarked ? "bookmark" : "bookmark-outline"}
                      size={20}
                      color={theme.colors.primary}
                    />
                  </View>
                  <Text style={styles(theme).company}>{job.company}</Text>

                  <View style={styles(theme).metaRow}>
                    <View style={styles(theme).metaLeft}>
                      <Ionicons name="location-outline" size={16} color={theme.colors.primary} />
                      <Text style={styles(theme).metaText}>{job.location}</Text>
                    </View>
                    <Text style={styles(theme).muted}>{job.posted}</Text>
                  </View>

                  <View style={styles(theme).tagsRow}>
                    <View style={styles(theme).tag}>
                      <Text style={styles(theme).tagText}>{job.salary}</Text>
                    </View>
                    <View style={styles(theme).tag}>
                      <Text style={styles(theme).tagText}>{job.type}</Text>
                    </View>
                    <View style={styles(theme).tag}>
                      <Text style={styles(theme).tagText}>{job.mode}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={isSettingsOpen} animationType="slide" transparent>
        <View style={styles(theme).modalBackdrop}>
          <View style={styles(theme).savedCard}>
            <View style={styles(theme).savedHeader}>
              <TouchableOpacity onPress={() => setIsSettingsOpen(false)} style={styles(theme).iconBtn}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles(theme).title}>Settings</Text>
              <View style={{ width: 24 }} />
            </View>


            <View style={styles(theme).settingRow}>
              <View style={styles(theme).rowLeft}>
                <Ionicons name="sunny-outline" size={20} color={theme.colors.iconPrimary} />
                <Text style={styles(theme).rowText}>Theme</Text>
              </View>
              <Switch
                value={theme.theme === "dark"}
                onValueChange={theme.toggleTheme}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>

            <View style={styles(theme).divider} />

            {/* Logout row  */}
            <TouchableOpacity
              style={styles(theme).settingRow}
              onPress={() => {
                // il faut mettre le logout ici, qui envoie vers le login;
                setIsSettingsOpen(false);
              }}
            >
              <View style={styles(theme).rowLeft}>
                <Ionicons name="log-out-outline" size={20} color={theme.colors.iconPrimary} />
                <Text style={styles(theme).rowText}>Logout</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.iconSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    name: { ...theme.typography.h2, color: theme.colors.text },
    email: { ...theme.typography.body, color: theme.colors.primary, marginTop: 4 },
    button: { backgroundColor: theme.colors.primary, paddingVertical: 14, paddingHorizontal: 24, borderRadius: theme.borderRadius.md, marginTop: theme.spacing.md },
    buttonText: { ...theme.typography.button, color: theme.colors.white },
    bio: { ...theme.typography.body, color: theme.colors.textSecondary, lineHeight: 20 },
    sectionList: { marginTop: theme.spacing.xl, backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.lg, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: theme.spacing.md },
    rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    rowText: { ...theme.typography.body, color: theme.colors.text, marginLeft: 12 },
    divider: { height: 1, backgroundColor: theme.colors.border },


    modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", justifyContent: "flex-end" },
    modalCard: { backgroundColor: theme.colors.background, borderTopLeftRadius: theme.borderRadius.xl, borderTopRightRadius: theme.borderRadius.xl, padding: theme.spacing.lg, maxHeight: "88%" },
    modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: theme.spacing.md },
    iconBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: theme.borderRadius.sm },
    title: { ...theme.typography.h3, color: theme.colors.text },
    label: { ...theme.typography.caption, color: theme.colors.textSecondary, marginBottom: 6, marginTop: theme.spacing.md },
    input: { borderBottomWidth: 1, borderBottomColor: theme.colors.border, paddingVertical: 10, ...theme.typography.body, color: theme.colors.text },
    saveBtn: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: theme.borderRadius.md, alignItems: "center", justifyContent: "center", marginTop: theme.spacing.lg },
    saveText: { ...theme.typography.button, color: theme.colors.white },


    savedCard: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      maxHeight: "92%",
    },
    savedHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.md,
    },
    pagerText: { ...theme.typography.caption, color: theme.colors.text },
    jobCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },
    jobTitle: { ...theme.typography.h4, color: theme.colors.text },
    company: { ...theme.typography.body, color: theme.colors.textSecondary, marginTop: 2 },
    metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: theme.spacing.sm },
    metaLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
    metaText: { ...theme.typography.caption, color: theme.colors.text },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    tagsRow: { flexDirection: "row", gap: 8, marginTop: theme.spacing.sm, flexWrap: "wrap" },
    tag: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    tagText: { ...theme.typography.caption, color: theme.colors.text },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.md,
    }
  });