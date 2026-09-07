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
    if (!db) throw new Error("Database not connected");
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async createWebsiteOrder(order: InsertWebsiteOrder): Promise<WebsiteOrder> {
    if (!db) throw new Error("Database not connected");
    const [newOrder] = await db.insert(websiteOrders).values(order).returning();
    return newOrder;
  }
}

export class MemStorage implements IStorage {
  private contactMessages: ContactMessage[] = [];
  private websiteOrders: WebsiteOrder[] = [];
  private currentContactId = 1;
  private currentOrderId = 1;

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMsg: ContactMessage = {
      id: this.currentContactId++,
      ...message,
      createdAt: new Date(),
    };
    this.contactMessages.push(newMsg);
    console.log("[MemStorage] Received contact message:", newMsg.name, newMsg.email);
    return newMsg;
  }

  async createWebsiteOrder(order: InsertWebsiteOrder): Promise<WebsiteOrder> {
    const newOrder: WebsiteOrder = {
      id: this.currentOrderId++,
      businessName: order.businessName,
      clientName: order.clientName,
      email: order.email,
      phone: order.phone,
      websiteType: order.websiteType,
      requiredPages: order.requiredPages ?? null,
      referenceWebsite: order.referenceWebsite ?? null,
      additionalRequirements: order.additionalRequirements ?? null,
      district: order.district ?? null,
      taluk: order.taluk ?? null,
      villageArea: order.villageArea ?? null,
      createdAt: new Date(),
    };
    this.websiteOrders.push(newOrder);
    console.log("[MemStorage] Received website/service order:", newOrder.businessName || newOrder.clientName, newOrder.websiteType);
    return newOrder;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemStorage();

