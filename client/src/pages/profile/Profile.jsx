/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import PageContainer from "../../components/common/PageContainer";
import useProfile from "../../hooks/useProfile";

const Profile = () => {
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
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
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
    try {
      await updateProfile(profileForm);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      alert("Password updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Profile</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profile Card */}
        <form onSubmit={saveProfile} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
            <p className="text-sm text-gray-500">Update your profile information and preferences.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Currency</label>
              <select
                name="currency"
                value={profileForm.currency}
                onChange={handleProfileChange}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                required
              >
                <option value="" disabled>Select Currency</option>
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="JPY">JPY (¥) - Japanese Yen</option>
                <option value="CAD">CAD (C$) - Canadian Dollar</option>
                <option value="AUD">AUD (A$) - Australian Dollar</option>
                <option value="SGD">SGD (S$) - Singapore Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Financial Goal</label>
              <select
                name="timezone"
                value={profileForm.timezone}
                onChange={handleProfileChange}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                required
              >
                <option value="" disabled>Select Goal</option>
                <option value="Track Expenses">Track Expenses</option>
                <option value="Build Savings">Build Savings</option>
                <option value="Pay Off Debt">Pay Off Debt</option>
                <option value="Invest / Grow Wealth">Invest / Grow Wealth</option>
                <option value="Plan for Retirement">Plan for Retirement</option>
              </select>
            </div>
          </div>

          <button className="w-full sm:w-auto rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition active:scale-95 cursor-pointer">
            Save Profile
          </button>
        </form>

        {/* Change Password Card */}
        <form onSubmit={savePassword} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Security</h2>
            <p className="text-sm text-gray-500">Ensure your account is using a secure password.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          <button className="w-full sm:w-auto rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition active:scale-95 cursor-pointer">
            Update Password
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default Profile;
