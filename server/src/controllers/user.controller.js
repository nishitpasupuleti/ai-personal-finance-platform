import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { users } from "../db/schema.js";
import { updateProfileSchema, updatePasswordSchema } from "../validators/user.validator.js";

export const updateProfile = async (req, res, next) => {
  try {
    const data = updateProfileSchema.parse(req.body);

    const [user] = await db.update(users).set(data).where(eq(users.id, req.user.id)).returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      currency: users.currency,
      timezone: users.timezone,
    });

    return res.json({ success: true, message: "Profile updated successfully", data: user });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const data = updatePasswordSchema.parse(req.body);

    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user.id),
    });

    const valid = await bcrypt.compare(data.currentPassword, user.password);

    if (!valid) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(data.newPassword, 10);

    await db.update(users).set({ password: hashed }).where(eq(users.id, req.user.id));

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};