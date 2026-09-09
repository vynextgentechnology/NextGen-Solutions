import { db } from "./db";
import {
  contactMessages,
  websiteOrders,
  jobApplications,
  type InsertContactMessage,
  type ContactMessage,
  type InsertWebsiteOrder,
  type WebsiteOrder,
  type InsertJobApplication,
  type JobApplication,
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createWebsiteOrder(order: InsertWebsiteOrder): Promise<WebsiteOrder>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
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

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    if (!db) throw new Error("Database not connected");
    const [newApp] = await db.insert(jobApplications).values(application).returning();
    return newApp;
  }
}

export class MemStorage implements IStorage {
  private contactMessages: ContactMessage[] = [];
  private websiteOrders: WebsiteOrder[] = [];
  private jobApplications: JobApplication[] = [];
  private currentContactId = 1;
  private currentOrderId = 1;
  private currentApplicationId = 1;

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

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const newApp: JobApplication = {
      id: this.currentApplicationId++,
      fullName: application.fullName,
      email: application.email,
      phone: application.phone,
      position: application.position,
      experience: application.experience,
      portfolioUrl: application.portfolioUrl ?? null,
      resumeUrl: application.resumeUrl ?? null,
      coverNote: application.coverNote ?? null,
      createdAt: new Date(),
    };
    this.jobApplications.push(newApp);
    console.log("[MemStorage] Received job application:", newApp.fullName, newApp.position);
    return newApp;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemStorage();


