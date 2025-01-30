"use server";

import axios from "axios";

export async function stkPushQuery(CheckoutRequestID) {
  try {
    // Generate timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);

    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;

    // Generate password
    const password = Buffer.from(shortcode + passkey + timestamp).toString(
      "base64"
    );

    // Get access token
    const auth = Buffer.from(
      process.env.MPESA_CONSUMER_KEY + ":" + process.env.MPESA_CONSUMER_SECRET
    ).toString("base64");

    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Make query request
    const queryResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract relevant information from the response
    const { ResultCode, ResultDesc } = queryResponse.data;
    
    return {
      data: {
        ResultCode: ResultCode.toString(),
        ResultDesc
      }
    };
  } catch (error) {
    console.error("STK Query Error:", error.response?.data || error.message);
    return {
      error: {
        response: {
          data: {
            errorMessage: error.response?.data?.errorMessage || error.message
          }
        }
      }
    };
  }
} 