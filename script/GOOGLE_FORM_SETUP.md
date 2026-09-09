# Automated Google Form Setup Guide for Job Vacancies

This repository includes an automated Google Apps Script that automatically creates the complete **VY NextGen Technologies Job Application Google Form** in your personal or corporate Google Drive in less than 60 seconds.

---

## 🚀 Quick Setup Instructions (3 Steps)

### Step 1: Open Google Apps Script
1. Open [https://script.google.com/home/start](https://script.google.com/home/start) in your browser.
2. Ensure you are signed in to your Google Account (or `vynextgentechnology@gmail.com`).
3. Click the **"+ New project"** button on the top left.

### Step 2: Paste the Automation Script
1. Open the file [`script/create_careers_form.gs`](file:///c:/Users/LOQ/Downloads/NextGen-Solutions/NextGen-Solutions/script/create_careers_form.gs) in this repository.
2. Copy all code in that file.
3. In Google Apps Script, select and delete any default text inside `Code.gs`.
4. Paste the copied code into the editor.
5. Click **Save** (disk icon or `Ctrl + S`).

### Step 3: Run & Get Your Form Link
1. Click the **"Run"** button at the top toolbar (make sure `createCareersGoogleForm` is selected in the function dropdown).
2. Google will display an **"Authorization required"** dialog:
   - Click **Review permissions**.
   - Select your Google Account.
   - Click **Advanced** $\to$ **Go to Untitled project (unsafe)**.
   - Click **Allow**.
3. In the **Execution log** at the bottom of the screen, you will see:
   ```
   =================================================================
   ✅ GOOGLE FORM CREATED SUCCESSFULLY!
   =================================================================
   PUBLIC FORM LINK (Send this to candidates / use on website):
   https://docs.google.com/forms/d/e/.../viewform
   -----------------------------------------------------------------
   ADMIN EDIT LINK (To customize form fields or view responses):
   https://docs.google.com/forms/d/.../edit
   =================================================================
   ```
4. Copy the **PUBLIC FORM LINK**.

---

## 🔗 Active Careers Google Form
The website is currently connected to the live Google Form:
[https://docs.google.com/forms/d/e/1FAIpQLScfJHdU2Ea2BZCnXHRXrR89hz8vs0h5HhGV_wforZRAbUSISg/viewform](https://docs.google.com/forms/d/e/1FAIpQLScfJHdU2Ea2BZCnXHRXrR89hz8vs0h5HhGV_wforZRAbUSISg/viewform)

Configured at the top of [`client/src/pages/Careers.tsx`](file:///c:/Users/LOQ/Downloads/NextGen-Solutions/NextGen-Solutions/client/src/pages/Careers.tsx):
```tsx
export const GOOGLE_FORM_CAREERS_URL = "https://docs.google.com/forms/d/e/1FAIpQLScfJHdU2Ea2BZCnXHRXrR89hz8vs0h5HhGV_wforZRAbUSISg/viewform";
```

All "Official Google Form" buttons across the website (Hero section, Job cards, Application modal, Talent network banner) immediately direct candidates to this live form!

