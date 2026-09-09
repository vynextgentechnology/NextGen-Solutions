import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendEnquiryNotification, sendContactNotification, sendCareerApplicationNotification } from "./mailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      
      // Dispatch email notification to vynextgentechnology@gmail.com
      sendContactNotification(message).catch((mailErr) => {
        console.error("[Mailer Error] Failed to send contact notification:", mailErr);
      });

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.orders.submit.path, async (req, res) => {
    try {
      const input = api.orders.submit.input.parse(req.body);
      const order = await storage.createWebsiteOrder(input);

      // Dispatch direct email notification to vynextgentechnology@gmail.com
      sendEnquiryNotification(order).catch((mailErr) => {
        console.error("[Mailer Error] Failed to send enquiry notification:", mailErr);
      });

      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.careers.apply.path, async (req, res) => {
    try {
      const input = api.careers.apply.input.parse(req.body);
      const application = await storage.createJobApplication(input);

      // Dispatch direct email notification to vynextgentechnology@gmail.com
      sendCareerApplicationNotification(application).catch((mailErr) => {
        console.error("[Mailer Error] Failed to send career application notification:", mailErr);
      });

      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}

