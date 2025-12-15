import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import BackHeader from "../components/BackHeader";
import { createUserFormStyles } from "../styles/screens/userFormStyles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { userService } from "../services/userService";
import { useNavigation } from "@react-navigation/native";

export default function UserFormScreen() {
  const theme = useTheme();
  const { user, updateUser } = useUser();
  const screenStyles = createScreenStyles(theme);
  const userFormStyles = createUserFormStyles(theme);
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [error, setError] = useState(null);

  const BIO_MAX = 250;

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setFetchingProfile(true);
      const profileData = await userService.getProfile();

      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
      setEmail(profileData.email || "");
      setBiography(profileData.biography || "");
      setInterest(profileData.interest || "");

      updateUser(profileData);
    } catch (err) {
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
      setEmail(user?.email || "");
      setBiography(user?.biography || "");
      setInterest(user?.interest || "");
    } finally {
      setFetchingProfile(false);
    }
  };

  const onSave = async () => {
    setError(null);

    if (!firstName || !lastName || !email) {
      setError("First name, last name, and email are required.");
      return;
    }

    setLoading(true);

    try {
      const updatedProfile = await userService.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        biography: biography.trim(),
        interest: interest.trim(),
      });

      updateUser(updatedProfile);

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProfile) {
    return (
      <View style={screenStyles.container}>
        <BackHeader title="Edit Profile" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={{
              ...theme.typography.body,
              color: theme.colors.textSecondary,
              marginTop: theme.spacing.md,
            }}
          >
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      <BackHeader title="Edit Profile" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={userFormStyles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="John"
            placeholderTextColor={theme.colors.textSecondary}
            style={userFormStyles.input}
            editable={!loading}
          />

          <Text style={userFormStyles.label}>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Doe"
            placeholderTextColor={theme.colors.textSecondary}
            style={userFormStyles.input}
            editable={!loading}
          />

          <Text style={userFormStyles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="johndoe@jobscope.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={theme.colors.textSecondary}
            style={userFormStyles.input}
            editable={!loading}
          />

          <Text style={userFormStyles.label}>Bio</Text>
          <TextInput
            value={biography}
            onChangeText={(t) => t.length <= BIO_MAX && setBiography(t)}
            placeholder="Write something about you..."
            placeholderTextColor={theme.colors.textSecondary}
            style={[
              userFormStyles.input,
              { height: 110, textAlignVertical: "top" },
            ]}
            multiline
            editable={!loading}
          />
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: 12,
              textAlign: "right",
              marginTop: -theme.spacing.md,
              marginBottom: theme.spacing.md,
            }}
          >
            {`${biography.length}/${BIO_MAX}`}
          </Text>

          <Text style={userFormStyles.label}>Interests</Text>
          <TextInput
            value={interest}
            onChangeText={setInterest}
            placeholder="Share your interests..."
            placeholderTextColor={theme.colors.textSecondary}
            style={userFormStyles.input}
            editable={!loading}
          />

          {error && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.error + "15",
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                marginTop: theme.spacing.lg,
                gap: theme.spacing.sm,
              }}
            >
              <Ionicons
                name="alert-circle"
                size={20}
                color={theme.colors.error}
              />
              <Text
                style={{
                  ...theme.typography.bodySmall,
                  color: theme.colors.error,
                  flex: 1,
                }}
              >
                {error}
              </Text>
            </View>
          )}

          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              onPress={onSave}
              title={loading ? "Saving..." : "Save changes"}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
