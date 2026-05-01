# Doctor-Donor-Inventory Workflow Guide

Welcome to the new fully integrated workflow connecting Doctors, the Inventory System, and Donors. This system replaces the static dashboard with a real-time responsive ecosystem.

## 🔄 The Request Lifecycle

1. **Doctor Creates Request (`PENDING`)**
   - The Doctor fills out the "Request Blood" form.
   - The system sets `priority_level` based on Urgency (NORMAL, HIGH, CRITICAL).
   - Saved with status `PENDING`.
2. **Admin/Blood Bank Approval (`APPROVED` or `REJECTED`)**
   - Inventory admin reviews the request.
   - If rejected, a `rejection_note` must be provided (visible to the Doctor).
   - If approved, the admin allocates the units (`units_approved`).
3. **Emergency Alerts (Automated)**
   - If the request is marked **HIGH** or **CRITICAL**, the system automatically queries eligible Donors.
   - Donors are strictly filtered by:
     - Matching Blood Group.
     - General Eligibility (No donation in the last 90 days).
     - Cooldown limit (`last_alerted_at` must be > 24 hours ago).
   - Alerts are capped at **30 donors** to prevent spamming.
4. **Fulfillment (`IN_PROGRESS` -> `FULFILLED`)**
   - The request transitions to `IN_PROGRESS` as donors donate or inventory is transported.
   - Once complete, it is marked as `FULFILLED` (or `COMPLETED`).

---

## 📱 Mobile Responsiveness

The Doctor Dashboard has been completely overhauled with SCSS (Sass):
- **Sidebar Navigation:** Collapses into a scrollable horizontal icon-bar at the top on devices < 768px.
- **Data Tables:** Allow horizontal scrolling on small screens instead of breaking the layout.
- **Form Layouts:** Two-column grids gracefully stack into single-column layouts.

---

## 📷 QR Scanner Workflow

The **Donor Scanner** tab uses the device's camera (via `html5-qrcode`) to scan a Donor's secure UUID (`qr_id`). 
1. The endpoint `/api/v1/donor/public/{qr_id}/` returns donor details.
2. The UI computes the `is_eligible` status dynamically (checking the 90-day gap rule).
3. **Green UI (✅):** The donor is eligible; doctor can proceed.
4. **Red UI (❌):** The donor is ineligible (shows last donation date).
*Edge Case Handled:* Scanning an invalid QR code gracefully alerts the user instead of crashing.

---

## 📊 Live Inventory

The "Blood Availability" tab is directly wired to the backend `LiveStockResponse`.
- Data is intelligently grouped by blood type (e.g., `A+`, `O-`).
- Units and Status (`NORMAL`, `LOW`, `CRITICAL`) are calculated in real-time.
- If the API fails or stock is entirely empty, a clean empty state with a "Retry Fetch" button is displayed.

## 🛠️ API Architecture Used
- **POST `/api/v1/bloodinventor/doctor/requests/`**: Create requests.
- **GET `/api/v1/bloodinventor/doctor/requests/`**: Fetch logged-in doctor's requests.
- **GET `/api/v1/bloodinventor/public/live-stock/`**: Real-time grouped inventory data.
- **GET `/api/v1/donor/public/{qr_id}/`**: Fetch secure donor details via QR.
