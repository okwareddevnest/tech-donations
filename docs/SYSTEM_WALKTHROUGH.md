# M-Pesa Donation System Walkthrough

This document provides a detailed explanation of how our M-Pesa donation system works, breaking down each component and explaining their interactions.

## Table of Contents
1. [Frontend Components](#frontend-components)
2. [Payment Processing Flow](#payment-processing-flow)
3. [Backend Integration](#backend-integration)
4. [Security Measures](#security-measures)

## Frontend Components

### PaymentForm Component
The payment form is the main interface where users input their donation details. Let's break down its key features:

```jsx
// Key state management
const [dataFromForm, setDataFromForm] = useState({
  mpesa_phone: "",
  name: "",
  amount: "",
});
```

This state manages three crucial pieces of information:
- `mpesa_phone`: The donor's M-Pesa phone number
- `name`: The donor's name
- `amount`: The donation amount

#### Form Validation
The system implements several validation checks:

1. **Empty Field Validation**
   - Ensures name is not empty
   - Validates M-Pesa number presence
   - Checks for valid amount (minimum 1 KES)

2. **Phone Number Format Validation**
   ```jsx
   const kenyanPhoneNumberRegex = /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/;
   ```
   This regex ensures the phone number follows Kenyan format patterns:
   - Starts with 07, 01, 254, or +254
   - Contains the correct number of digits
   - Supports both local and international formats

#### Payment States
The form handles different states of the payment process:
- Initial input state
- Loading state during STK push
- STK query loading state
- Success state
- Error state with appropriate messages

## Payment Processing Flow

### 1. STK Push Initiation
When a user submits the form, the following process is triggered:

```javascript
// In src/actions/stkPush.js
export async function sendStkPush(formData) {
  // 1. Phone number formatting
  const formattedPhone = phoneNumber.replace(/^0/, "254").replace(/^\+/, "");

  // 2. Generate timestamp and password
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

  // 3. Get M-Pesa access token
  // 4. Make STK push request
  // 5. Create initial donation record
}
```

This process:
1. Formats the phone number to M-Pesa's required format
2. Generates necessary authentication credentials
3. Initiates the STK push to the user's phone

### 2. Payment Verification
After STK push, the system:
1. Waits for 3 seconds
2. Queries the payment status
3. Updates the UI based on the response

```javascript
const stkPushQueryWithIntervals = async (CheckoutRequestID) => {
  // Wait for user action
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Query payment status
  const { data, error } = await stkPushQuery(CheckoutRequestID);
  
  // Handle response and update UI
}
```

## Backend Integration

### M-Pesa Callback Handling
The system processes M-Pesa callbacks through a secure endpoint:

```javascript
// In src/app/api/mpesa/[securityKey]/route.js
export async function POST(request, { params }) {
  // 1. Security validation
  // 2. IP validation (production only)
  // 3. Process transaction details
  // 4. Update donation status
}
```

Key security measures:
1. Validates security key
2. Whitelist Safaricom IPs in production
3. Extracts and validates transaction details
4. Updates donation status in database

#### Callback Data Processing
The system extracts important transaction details:
- Amount paid
- M-Pesa receipt number
- Phone number
- Transaction timestamp

## Security Measures

1. **IP Whitelisting**
   ```javascript
   const SAFARICOM_IPS = [
     '196.201.214.200',
     '196.201.214.206',
     // ... other IPs
   ];
   ```
   Only allows callbacks from verified Safaricom IPs in production.

2. **Security Key Validation**
   - Each callback must include a valid security key
   - Prevents unauthorized access to callback endpoint

3. **Data Validation**
   - Validates all user inputs
   - Sanitizes phone numbers
   - Verifies transaction amounts

4. **Error Handling**
   - Graceful error handling throughout the system
   - Detailed logging for debugging
   - User-friendly error messages

## Best Practices Implemented

1. **Frontend**
   - Form validation
   - Loading states
   - Error handling
   - User feedback

2. **Backend**
   - Server-side validation
   - Secure API endpoints
   - Transaction logging
   - Database updates

3. **Integration**
   - Proper error handling
   - Timeout management
   - Status verification
   - Secure communication

This system provides a robust, secure, and user-friendly way to process M-Pesa donations while maintaining proper security measures and best practices throughout the stack. 