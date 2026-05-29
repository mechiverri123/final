// ============================================================
// GID GARAGE — Google Apps Script
// Deploy this as a Web App to receive booking submissions
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1e2DWCYxa6DHg4PtKsXW7gTEPkFNjcKCbdZpslQ_s9BU/edit
// 2. Click Extensions > Apps Script
// 3. Paste this entire file, replacing any existing code
// 4. Click Deploy > New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the Web App URL
// 6. Paste it into BookingWidget.tsx as APPS_SCRIPT_URL
// ============================================================

const SHEET_NAME = 'Bookings';
const SPREADSHEET_ID = '1e2DWCYxa6DHg4PtKsXW7gTEPkFNjcKCbdZpslQ_s9BU';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['ID', 'Date', 'Time', 'Service', 'Name', 'Phone', 'Email', 'Vehicle', 'Notes', 'Status', 'Created At']);
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#dc2626').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.id,
      data.date,
      data.time,
      data.service,
      data.name,
      data.phone,
      data.email,
      data.vehicle,
      data.notes || '',
      data.status,
      data.createdAt,
    ]);

    // Send notification email to owner
    GmailApp.sendEmail(
      'gidgarageaz@gmail.com',
      `New Booking: ${data.service} — ${data.name}`,
      `New appointment booked!\n\nID: ${data.id}\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nVehicle: ${data.vehicle}\nNotes: ${data.notes || 'None'}`
    );

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('GID Garage booking endpoint is live.').setMimeType(ContentService.MimeType.TEXT);
}
