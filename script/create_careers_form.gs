/**
 * =========================================================================
 * VY NEXTGEN TECHNOLOGIES - AUTOMATED GOOGLE FORM GENERATOR
 * =========================================================================
 * 
 * Instructions:
 * 1. Open https://script.google.com in your browser (logged into your Google account).
 * 2. Click "New project".
 * 3. Delete any default code in Code.gs and paste this entire script.
 * 4. Click the "Run" button at the top toolbar (select `createCareersGoogleForm`).
 * 5. Review and grant Google permissions when prompted.
 * 6. Check the "Execution log" at the bottom: it will display the Live Published
 *    Google Form Link and Edit Link.
 * 7. Copy the published link into your `client/src/pages/Careers.tsx` file under
 *    `GOOGLE_FORM_CAREERS_URL`.
 * =========================================================================
 */

function createCareersGoogleForm() {
  const formTitle = "VY NextGen Technologies - Official Job Application Form";
  const formDescription = 
    "Welcome to the official recruitment portal of VY NextGen Technologies (Karur, Tamil Nadu).\n\n" +
    "We build enterprise web platforms, GST billing software, POS solutions, and cloud applications. " +
    "Please fill out your details below. Our talent acquisition team reviews every profile within 24 to 48 hours.\n\n" +
    "📍 Location: Karur, Tamil Nadu, India\n" +
    "📞 HR Helpline: +91 87540 20556\n" +
    "✉️ Email: vynextgentechnology@gmail.com\n" +
    "🌐 Website: https://vynextgen.com";

  // 1. Create a brand new Google Form
  const form = FormApp.create(formTitle);
  form.setDescription(formDescription);
  form.setConfirmationMessage(
    "🎉 Thank you for applying to VY NextGen Technologies!\n\n" +
    "Your application has been received. Our recruitment team will review your qualifications and contact you via Phone/WhatsApp within 24-48 hours.\n\n" +
    "For immediate follow-up, you can WhatsApp our HR desk at +91 87540 20556."
  );
  form.setAllowResponseEdits(false);
  form.setCollectEmail(true); // Collects email address automatically or via field

  // 2. Full Name
  const nameItem = form.addTextItem();
  nameItem.setTitle("1. Full Name")
          .setHelpText("Enter your full legal name as per government ID")
          .setRequired(true);

  // 3. Email Address
  const emailItem = form.addTextItem();
  emailItem.setTitle("2. Primary Email Address")
           .setHelpText("We will send interview invitations and updates to this email")
           .setRequired(true);

  // 4. Phone & WhatsApp Number
  const phoneItem = form.addTextItem();
  phoneItem.setTitle("3. WhatsApp / Contact Phone Number")
           .setHelpText("Include country code, e.g. +91 98765 43210")
           .setRequired(true);

  // 5. Position Applied For
  const positionItem = form.addMultipleChoiceItem();
  positionItem.setTitle("4. Position You Are Applying For")
              .setHelpText("Select the job opening that best fits your expertise")
              .setChoiceValues([
                "Senior Full-Stack Developer (React / Node.js / PostgreSQL)",
                "Frontend Engineer (React 18+ & TypeScript)",
                "Billing Software & POS Systems Specialist",
                "UI/UX & Product Designer (Figma & Design Systems)",
                "Junior Software Trainee / Associate Developer (Freshers)",
                "Business Development & Client Relations Executive",
                "QA Automation & Software Test Engineer",
                "General Application / Other Openings"
              ])
              .setRequired(true);

  // 6. Total Years of Experience
  const expItem = form.addMultipleChoiceItem();
  expItem.setTitle("5. Total Professional Experience")
         .setChoiceValues([
           "Fresher / Recent College Graduate (0 Years)",
           "1 - 2 Years",
           "2 - 4 Years",
           "4+ Years (Senior Engineer / Specialist)"
         ])
         .setRequired(true);

  // 7. Preferred Work Arrangement
  const modeItem = form.addMultipleChoiceItem();
  modeItem.setTitle("6. Preferred Work Arrangement")
          .setChoiceValues([
            "On-Site (Karur, Tamil Nadu)",
            "Hybrid Mode",
            "Remote Friendly"
          ])
          .setRequired(true);

  // 8. Key Technical Skills & Tools
  const skillsItem = form.addParagraphTextItem();
  skillsItem.setTitle("7. Key Technical Skills & Technologies")
            .setHelpText("List the programming languages, frameworks, or tools you are proficient in (e.g., React, Node.js, TypeScript, PostgreSQL, Figma, GST Software, Sales, Postman)")
            .setRequired(true);

  // 9. Portfolio / GitHub / LinkedIn Profile URL
  const linksItem = form.addTextItem();
  linksItem.setTitle("8. LinkedIn or GitHub Profile URL")
           .setHelpText("Link to your professional profile or code repositories (e.g., https://linkedin.com/in/... or https://github.com/...)")
           .setRequired(false);

  // 10. Resume / CV Link
  const resumeItem = form.addTextItem();
  resumeItem.setTitle("9. Resume / CV Link (Google Drive, Dropbox, or Cloud URL)")
            .setHelpText("IMPORTANT: Ensure link sharing is set to 'Anyone with the link can view'")
            .setRequired(true);

  // 11. Availability / Notice Period
  const noticeItem = form.addMultipleChoiceItem();
  noticeItem.setTitle("10. Notice Period / Availability to Join")
            .setChoiceValues([
              "Immediate Joiner (Within 7 Days)",
              "15 Days Notice",
              "30 Days Notice",
              "More than 30 Days"
            ])
            .setRequired(true);

  // 12. Current Location / City
  const locationItem = form.addTextItem();
  locationItem.setTitle("11. Current City & State of Residence")
              .setHelpText("e.g. Karur, Coimbatore, Trichy, Chennai, Madurai, Bengaluru")
              .setRequired(true);

  // 13. Cover Note / Why VY NextGen
  const whyItem = form.addParagraphTextItem();
  whyItem.setTitle("12. Why are you interested in joining VY NextGen Technologies?")
         .setHelpText("Tell us briefly about what excites you about this role, your proudest project, or your career ambitions.")
         .setRequired(false);

  // Print results to Execution Log
  const publishedUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();

  Logger.log("=================================================================");
  Logger.log("✅ GOOGLE FORM CREATED SUCCESSFULLY!");
  Logger.log("=================================================================");
  Logger.log("PUBLIC FORM LINK (Send this to candidates / use on website):");
  Logger.log(publishedUrl);
  Logger.log("-----------------------------------------------------------------");
  Logger.log("ADMIN EDIT LINK (To customize form fields or view responses):");
  Logger.log(editUrl);
  Logger.log("=================================================================");
}
