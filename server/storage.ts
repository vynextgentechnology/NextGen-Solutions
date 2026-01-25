import { db } from "./db";
import {
  contactMessages,
  websiteOrders,
  type InsertContactMessage,
  type ContactMessage,
  type InsertWebsiteOrder,
  type WebsiteOrder
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createWebsiteOrder(order: InsertWebsiteOrder): Promise<WebsiteOrder>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async createWebsiteOrder(order: InsertWebsiteOrder): Promise<WebsiteOrder> {
    const [newOrder] = await db.insert(websiteOrders).values(order).returning();
    return newOrder;
  }
}

export const storage = new DatabaseStorage();
