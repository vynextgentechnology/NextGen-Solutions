import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const websiteOrders = pgTable("website_orders", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  clientName: text("client_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  websiteType: text("website_type").notNull(),
  requiredPages: text("required_pages"),
  referenceWebsite: text("reference_website"),
  additionalRequirements: text("additional_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

export const insertWebsiteOrderSchema = createInsertSchema(websiteOrders).omit({
  id: true,
  createdAt: true
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertWebsiteOrder = z.infer<typeof insertWebsiteOrderSchema>;
export type WebsiteOrder = typeof websiteOrders.$inferSelect;
