import nodemailer from "nodemailer";
import type { 
  InsertWebsiteOrder, 
  InsertContactMessage, 
  WebsiteOrder, 
  ContactMessage,
  InsertJobApplication,
  JobApplication
} from "@shared/schema";


const COMPANY_NOTIFICATION_EMAIL = "vynextgentechnology@gmail.com";

/**
 * Configure Nodemailer transport.
 * Supports standard Gmail SMTP via EMAIL_USER and EMAIL_PASS (Google App Password),
 * or custom SMTP via SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.
 */
function getTransporter() {
  const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!emailUser || !emailPass) {
    return null;
  }

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  // Default to Gmail service
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

/**
 * Dispatches an automated email notification to vynextgentechnology@gmail.com
 * whenever a customer submits an enquiry form.
 */
export async function sendEnquiryNotification(order: WebsiteOrder | InsertWebsiteOrder): Promise<{ success: boolean; message: string }> {
  const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const cleanPhone = (order.phone || "").replace(/[^0-9]/g, "");

  const subject = `🚀 New Project Enquiry: ${order.businessName || order.clientName} - ${order.websiteType}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #041d57 0%, #1e40af 100%); padding: 24px; color: #ffffff; text-align: center; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #93c5fd; }
          .body { padding: 24px; }
          .badge { display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          td.label { width: 35%; font-weight: 600; color: #64748b; background-color: #f8fafc; }
          td.value { width: 65%; color: #0f172a; font-weight: 500; }
          .actions { margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; text-align: center; }
          .btn { display: inline-block; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; margin-right: 8px; }
          .btn-primary { background: #2563eb; color: #ffffff !important; }
          .btn-whatsapp { background: #10b981; color: #ffffff !important; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>VY NextGen Technologies</h1>
            <p>New Client Project Enquiry Received</p>
          </div>
          <div class="body">
            <span class="badge">Lead Status: New Submission</span>
            <p style="font-size: 14px; line-height: 1.5; color: #334155; margin-top: 0;">
              A customer has just submitted their project requirements via the website enquiry form.
            </p>

            <table>
              <tr>
                <td class="label">Contact Person</td>
                <td class="value"><strong>${order.clientName}</strong></td>
              </tr>
              <tr>
                <td class="label">Company / Business</td>
                <td class="value">${order.businessName || "Not Provided"}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${order.email}" style="color: #2563eb;">${order.email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="value"><a href="tel:${order.phone}" style="color: #2563eb;">${order.phone}</a></td>
              </tr>
              <tr>
                <td class="label">Service Category</td>
                <td class="value"><strong style="color: #0284c7;">${order.websiteType}</strong></td>
              </tr>
              <tr>
                <td class="label">Pages / Modules</td>
                <td class="value">${order.requiredPages || "Standard"}</td>
              </tr>
              <tr>
                <td class="label">Reference Website</td>
                <td class="value">${order.referenceWebsite ? `<a href="${order.referenceWebsite}" target="_blank" style="color: #2563eb;">${order.referenceWebsite}</a>` : "None"}</td>
              </tr>
              <tr>
                <td class="label">City / Location</td>
                <td class="value">${order.district || "Not Specified"}</td>
              </tr>
              <tr>
                <td class="label">Description / Features</td>
                <td class="value" style="white-space: pre-wrap;">${order.additionalRequirements || "None provided"}</td>
              </tr>
              <tr>
                <td class="label">Received At</td>
                <td class="value">${formattedTime} (IST)</td>
              </tr>
            </table>

            <div class="actions">
              <a href="tel:${order.phone}" class="btn btn-primary">Call Client</a>
              ${cleanPhone ? `<a href="https://wa.me/${cleanPhone}" class="btn btn-whatsapp">WhatsApp Client</a>` : ""}
              <a href="mailto:${order.email}?subject=${encodeURIComponent("Re: Your Enquiry with VY NextGen Technologies")}" class="btn btn-primary" style="background:#475569;">Reply by Email</a>
            </div>
          </div>
          <div class="footer">
            Delivered directly to <strong>${COMPANY_NOTIFICATION_EMAIL}</strong> • VY NextGen Technologies Lead Dispatcher
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
===================================================================
NEW PROJECT ENQUIRY - VY NEXTGEN TECHNOLOGIES
===================================================================
Client Name:      ${order.clientName}
Company Name:     ${order.businessName || "N/A"}
Email Address:    ${order.email}
Phone / WhatsApp: ${order.phone}
Service Category: ${order.websiteType}
Pages / Scope:    ${order.requiredPages || "Standard"}
Reference URL:    ${order.referenceWebsite || "None"}
City / Location:  ${order.district || "Not specified"}
Requirements:     ${order.additionalRequirements || "None"}
Received At:      ${formattedTime} IST
===================================================================
  `.trim();

  // Always log clearly to the console for real-time monitoring
  console.log("\n" + textContent + "\n");

  const transporter = getTransporter();

  if (!transporter) {
    const warning = `[Email Dispatch] Live email dispatch paused: EMAIL_USER / EMAIL_PASS not set in .env. Enquiry details safely logged above for ${COMPANY_NOTIFICATION_EMAIL}.`;
    console.log(warning);
    return { success: false, message: warning };
  }

  try {
    const info = await transporter.sendMail({
      from: `"VY NextGen Lead Desk" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
      to: COMPANY_NOTIFICATION_EMAIL,
      replyTo: order.email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email Dispatch] Successfully sent enquiry email to ${COMPANY_NOTIFICATION_EMAIL}! Message ID: ${info.messageId}`);
    return { success: true, message: `Email delivered to ${COMPANY_NOTIFICATION_EMAIL}` };
  } catch (error: any) {
    console.error(`[Email Dispatch] Error sending email to ${COMPANY_NOTIFICATION_EMAIL}:`, error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Dispatches an automated email notification to vynextgentechnology@gmail.com
 * whenever a general contact message is submitted.
 */
export async function sendContactNotification(message: ContactMessage | InsertContactMessage): Promise<{ success: boolean; message: string }> {
  const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const subject = `📬 New Contact Inquiry from ${message.name}`;

  const textContent = `
===================================================================
NEW CONTACT INQUIRY - VY NEXTGEN TECHNOLOGIES
===================================================================
Name:       ${message.name}
Email:      ${message.email}
Phone:      ${message.phone || "N/A"}
Message:    ${message.message}
Received:   ${formattedTime} IST
===================================================================
  `.trim();

  console.log("\n" + textContent + "\n");

  const transporter = getTransporter();
  if (!transporter) {
    return { success: false, message: "SMTP credentials not configured" };
  }

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #041d57;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${message.email}">${message.email}</a></p>
        <p><strong>Phone:</strong> ${message.phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #2563eb; margin: 0;">${message.message}</blockquote>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">Delivered to ${COMPANY_NOTIFICATION_EMAIL} at ${formattedTime}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"VY NextGen Contact Desk" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
      to: COMPANY_NOTIFICATION_EMAIL,
      replyTo: message.email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email Dispatch] Successfully sent contact inquiry to ${COMPANY_NOTIFICATION_EMAIL}`);
    return { success: true, message: `Email delivered to ${COMPANY_NOTIFICATION_EMAIL}` };
  } catch (error: any) {
    console.error(`[Email Dispatch] Error sending contact email:`, error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Dispatches an automated email notification to vynextgentechnology@gmail.com
 * whenever a candidate submits a job application on the Careers page.
 */
export async function sendCareerApplicationNotification(app: JobApplication | InsertJobApplication): Promise<{ success: boolean; message: string }> {
  const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const cleanPhone = (app.phone || "").replace(/[^0-9]/g, "");
  const subject = `💼 New Job Application: ${app.fullName} - ${app.position}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #041d57 0%, #1e40af 100%); padding: 24px; color: #ffffff; text-align: center; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #93c5fd; }
          .body { padding: 24px; }
          .badge { display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          td.label { width: 35%; font-weight: 600; color: #64748b; background-color: #f8fafc; }
          td.value { width: 65%; color: #0f172a; font-weight: 500; }
          .actions { margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; text-align: center; flex-wrap: wrap; }
          .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; margin-right: 8px; }
          .btn-primary { background: #2563eb; color: #ffffff !important; }
          .btn-whatsapp { background: #10b981; color: #ffffff !important; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>VY NextGen Technologies</h1>
            <p>Talent Acquisition & Careers Portal</p>
          </div>
          <div class="body">
            <span class="badge">Candidate Status: Application Submitted</span>
            <h2 style="font-size: 18px; color: #0f172a; margin-top: 4px;">Candidate: ${app.fullName}</h2>
            <p style="font-size: 14px; color: #475569; margin-top: 0;">Applied for: <strong style="color: #2563eb;">${app.position}</strong></p>

            <table>
              <tr>
                <td class="label">Candidate Name</td>
                <td class="value"><strong>${app.fullName}</strong></td>
              </tr>
              <tr>
                <td class="label">Position</td>
                <td class="value"><strong style="color: #0284c7;">${app.position}</strong></td>
              </tr>
              <tr>
                <td class="label">Experience Level</td>
                <td class="value">${app.experience}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${app.email}" style="color: #2563eb;">${app.email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="value"><a href="tel:${app.phone}" style="color: #2563eb;">${app.phone}</a></td>
              </tr>
              <tr>
                <td class="label">LinkedIn / GitHub</td>
                <td class="value">${app.portfolioUrl ? `<a href="${app.portfolioUrl}" target="_blank" style="color: #2563eb;">${app.portfolioUrl}</a>` : "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Resume Link</td>
                <td class="value">${app.resumeUrl ? `<a href="${app.resumeUrl}" target="_blank" style="color: #2563eb; font-weight: bold;">View / Download Resume</a>` : "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Cover Note / Intro</td>
                <td class="value" style="white-space: pre-wrap;">${app.coverNote || "None provided"}</td>
              </tr>
              <tr>
                <td class="label">Applied At</td>
                <td class="value">${formattedTime} (IST)</td>
              </tr>
            </table>

            <div class="actions">
              <a href="tel:${app.phone}" class="btn btn-primary">Call Candidate</a>
              ${cleanPhone ? `<a href="https://wa.me/${cleanPhone}" class="btn btn-whatsapp">WhatsApp Candidate</a>` : ""}
              <a href="mailto:${app.email}?subject=${encodeURIComponent(`Application at VY NextGen Technologies - ${app.position}`)}" class="btn btn-primary" style="background:#475569;">Email Candidate</a>
            </div>
          </div>
          <div class="footer">
            Delivered directly to <strong>${COMPANY_NOTIFICATION_EMAIL}</strong> • VY NextGen Recruitment Desk
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
===================================================================
NEW JOB APPLICATION - VY NEXTGEN TECHNOLOGIES
===================================================================
Candidate Name:   ${app.fullName}
Position:         ${app.position}
Experience:       ${app.experience}
Email Address:    ${app.email}
Phone / WhatsApp: ${app.phone}
LinkedIn / Port:  ${app.portfolioUrl || "None"}
Resume URL:       ${app.resumeUrl || "None"}
Cover Note:       ${app.coverNote || "None"}
Received At:      ${formattedTime} IST
===================================================================
  `.trim();

  console.log("\n" + textContent + "\n");

  const transporter = getTransporter();
  if (!transporter) {
    const warning = `[Careers Mailer] Live email dispatch paused: EMAIL_USER / EMAIL_PASS not set. Application details logged above for ${COMPANY_NOTIFICATION_EMAIL}.`;
    console.log(warning);
    return { success: false, message: warning };
  }

  try {
    const info = await transporter.sendMail({
      from: `"VY NextGen Careers Desk" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
      to: COMPANY_NOTIFICATION_EMAIL,
      replyTo: app.email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Careers Mailer] Successfully sent application email to ${COMPANY_NOTIFICATION_EMAIL}! Message ID: ${info.messageId}`);
    return { success: true, message: `Application delivered to ${COMPANY_NOTIFICATION_EMAIL}` };
  } catch (error: any) {
    console.error(`[Careers Mailer] Error sending application email:`, error.message);
    return { success: false, message: error.message };
  }
}

