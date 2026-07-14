import { and, asc, eq } from "drizzle-orm";

import db from "../db/index.js";
import { categories } from "../db/schema.js";

import { createCategorySchema } from "../validators/category.validator.js";

export const createCategory = async (req, res, next) => {
  try {
    const data = createCategorySchema.parse(req.body);

    const existing = await db
      .select()
      .from(categories)
      .where(
        and(
          eq(categories.userId, req.user.id),
          eq(categories.name, data.name)
        )
      )
      .limit(1);

    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const [category] = await db
      .insert(categories)
      .values({
        userId: req.user.id,
        name: data.name,
        icon: data.icon,
        color: data.color,
      })
      .returning();

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const data = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, req.user.id))
      .orderBy(asc(categories.name));

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [category] = await db
      .delete(categories)
      .where(
        and(
          eq(categories.id, id),
          eq(categories.userId, req.user.id)
        )
      )
      .returning();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};