# GID Garage — Setup Guide

## What's New
- ✅ Book Now button opens a full booking modal (replaces Calendly)
- ✅ Bookings saved locally in the browser (works immediately, no setup)
- ✅ Admin schedule view at yoursite.com/admin or yoursite.com/#admin
- ✅ Google Sheets integration (5 min setup below)
- ✅ Email confirmations via EmailJS (5 min setup below)

---

## Step 1 — Google Sheets (receive bookings in your spreadsheet)

1. Open **Extensions > Apps Script** in your Google Sheet:
   https://docs.google.com/spreadsheets/d/1e2DWCYxa6DHg4PtKsXW7gTEPkFNjcKCbdZpslQ_s9BU/edit

2. Paste the contents of `google-apps-script.js` (included in this zip), replacing any existing code.

3. Click **Deploy > New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**

4. Click **Deploy**, authorize when prompted, then **copy the Web App URL**.

5. Open `src/BookingWidget.tsx` and replace:
   ```
   const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
   with your URL.

---

## Step 2 — EmailJS (send confirmation emails)

1. Go to https://emailjs.com and sign up (free — 200 emails/month)

2. **Add a Service**: Connect your Gmail account (gidgarageaz@gmail.com)
   - Copy the **Service ID**

3. **Create a Template** with these variables:
   - `{{to_name}}` — customer name
   - `{{to_email}}` — customer email (set as "To Email" in template settings)
   - `{{owner_email}}` — gidgarageaz@gmail.com (add as CC)
   - `{{service_name}}` — service booked
   - `{{appointment_date}}` — date
   - `{{appointment_time}}` — time
   - `{{vehicle}}` — vehicle info
   - `{{phone}}` — customer phone
   - `{{notes}}` — any notes
   - `{{booking_id}}` — booking ID

   Example subject: `Appointment Confirmed — {{service_name}} on {{appointment_date}}`

4. Copy your **Template ID** and **Public Key** (Account > General)

5. Open `src/BookingWidget.tsx` and fill in:
   ```
   const EMAILJS_SERVICE_ID  = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY  = 'your_public_key';
   ```

---

## Admin Schedule

Visit `/admin` on your site to see all bookings.
- **List view**: filter by status, mark complete, cancel appointments
- **Calendar view**: see bookings by day
- Link is in the footer (small, discreet)

---

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```
Deploy the `dist/` folder to your host (Netlify, Vercel, etc.)
