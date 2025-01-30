import { NextResponse } from "next/server";
import { updateDonationByCheckoutId } from "@/services/donationService";

// Safaricom IP whitelist
const SAFARICOM_IPS = [
  '196.201.214.200',
  '196.201.214.206',
  '196.201.213.114',
  '196.201.214.207',
  '196.201.214.208',
  '196.201.213.44',
  '196.201.212.127',
  '196.201.212.138',
  '196.201.212.129',
  '196.201.212.136',
  '196.201.212.74',
  '196.201.212.69'
];

export async function POST(request, { params }) {
  console.log("\n=== M-Pesa Callback Received ===");
  console.log("Request headers:", Object.fromEntries(request.headers));
  console.log("Request URL:", request.url);
  console.log("Security Key:", params.securityKey);
  console.log("Environment:", process.env.NODE_ENV);
  
  try {
    // Security key validation
    console.log("\nValidating security key...");
    console.log("Received key:", params.securityKey);
    console.log("Expected key:", process.env.MPESA_CALLBACK_SECRET_KEY);
    if (params.securityKey !== process.env.MPESA_CALLBACK_SECRET_KEY) {
      console.log("❌ Invalid security key");
      return NextResponse.json("ok", { status: 200 });
    }
    console.log("✅ Security key valid");

    // IP validation - skip in development
    if (process.env.NODE_ENV === 'production') {
      const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr');
      console.log("\nValidating IP address...");
      console.log("Client IP:", clientIp);
      if (!SAFARICOM_IPS.includes(clientIp || '')) {
        console.log("❌ IP not whitelisted");
        return NextResponse.json("ok", { status: 200 });
      }
      console.log("✅ IP validation passed");
    } else {
      console.log("\n⚠️ Skipping IP validation in development");
    }

    console.log("\nParsing request body...");
    const data = await request.json();
    console.log("Callback data:", JSON.stringify(data, null, 2));
    
    const checkoutRequestId = data.Body.stkCallback.CheckoutRequestID;
    console.log("\nCheckoutRequestID:", checkoutRequestId);

    // Handle failed transactions
    if (!data.Body.stkCallback.CallbackMetadata) {
      console.log("\n❌ Transaction failed:", data.Body.stkCallback.ResultDesc);
      await updateDonationByCheckoutId(checkoutRequestId, {
        status: 'failed',
        resultDesc: data.Body.stkCallback.ResultDesc
      });
      return NextResponse.json("ok", { status: 200 });
    }

    // Extract transaction details
    console.log("\nExtracting transaction details...");
    const body = data.Body.stkCallback.CallbackMetadata;
    const amountObj = body.Item.find(obj => obj.Name === "Amount");
    const amount = amountObj.Value;

    const codeObj = body.Item.find(
      obj => obj.Name === "MpesaReceiptNumber"
    );
    const mpesaCode = codeObj.Value;

    const phoneNumberObj = body.Item.find(
      obj => obj.Name === "PhoneNumber"
    );
    const phoneNumber = phoneNumberObj.Value.toString();

    // Transaction timestamp
    const timestampObj = body.Item.find(
      obj => obj.Name === "TransactionDate"
    );
    const transactionDate = timestampObj ? timestampObj.Value : new Date().toISOString();

    // Update donation in database
    console.log("\nUpdating donation with data:", {
      status: 'completed',
      mpesaCode,
      transactionDate,
      amount
    });

    const updateResult = await updateDonationByCheckoutId(checkoutRequestId, {
      status: 'completed',
      mpesaCode,
      transactionDate,
      amount
    });

    console.log("Update result:", updateResult);

    console.log("\n✅ Transaction processed successfully:", {
      status: "success",
      amount,
      mpesaCode,
      phoneNumber,
      transactionDate,
      checkoutRequestId
    });

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.error("\n❌ Callback processing error:", error);
    return NextResponse.json("ok", { status: 200 });
  }
} 