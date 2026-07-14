import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/me");
      setProfile(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (payload) => {
    const { data } = await api.patch("/users/profile", payload);
    setProfile(data.data);
  };

  const updatePassword = async (payload) => {
    await api.patch("/users/password", payload);
  };

  return { profile, loading, updateProfile, updatePassword, fetchProfile };
};

export default useProfile;