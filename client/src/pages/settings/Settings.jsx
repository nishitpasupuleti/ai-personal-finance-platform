/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import PageContainer from "../../components/common/PageContainer";
import useProfile from "../../hooks/useProfile";

const Settings = () => {
  const { profile, loading, updateProfile, updatePassword } = useProfile();

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    currency: "",
    timezone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        fullName: profile.fullName,
        currency: profile.currency,
        timezone: profile.timezone,
      });
    }
  }, [profile]);

  if (loading) {
    return (
      <PageContainer>
        <h2>Loading...</h2>
      </PageContainer>
    );
  }

  const handleProfileChange = (e) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    alert("Profile updated");
  };

  const savePassword = async (e) => {
    e.preventDefault();
    await updatePassword(passwordForm);
    setPasswordForm({ currentPassword: "", newPassword: "" });
    alert("Password updated");
  };

  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={saveProfile} className="space-y-4 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Profile</h2>

          <input
            name="fullName"
            value={profileForm.fullName}
            onChange={handleProfileChange}
            placeholder="Full Name"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="currency"
            value={profileForm.currency}
            onChange={handleProfileChange}
            placeholder="Currency"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="timezone"
            value={profileForm.timezone}
            onChange={handleProfileChange}
            placeholder="Timezone"
            className="w-full rounded-lg border p-3"
          />

          <button className="rounded-lg bg-black px-5 py-2 text-white">Save Profile</button>
        </form>

        <form onSubmit={savePassword} className="space-y-4 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="w-full rounded-lg border p-3"
          />

          <button className="rounded-lg bg-black px-5 py-2 text-white">Update Password</button>
        </form>
      </div>
    </PageContainer>
  );
};

export default Settings;