"use client";
import React, { useState } from "react";
import { sendStkPush } from "@/actions/stkPush";
import { stkPushQuery } from "@/actions/stkPushQuery";
import PaymentSuccess from "./Success";
import STKPushQueryLoading from "./StkQueryLoading";

function PaymentForm() {
  const [dataFromForm, setDataFromForm] = useState({
    mpesa_phone: "",
    name: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stkQueryLoading, setStkQueryLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  var reqcount = 0;

  const stkPushQueryWithIntervals = async (CheckoutRequestID) => {
    setStkQueryLoading(true);
    
    // Wait for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const { data, error } = await stkPushQuery(CheckoutRequestID);

      if (error) {
        setStkQueryLoading(false);
        setLoading(false);
        setErrorMessage(error?.response?.data?.errorMessage || "Payment verification failed");
        return;
      }

      if (data) {
        if (data.ResultCode === "0") {
          // Payment successful - update the status in database
          const updateResponse = await fetch('/api/donations/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              checkoutRequestId: CheckoutRequestID,
              mpesaCode: data.ResultDesc.match(/\[(\w+)\]/)?.[1] || ''  // Extract mpesa code from ResultDesc
            })
          });

          if (updateResponse.ok) {
            setStkQueryLoading(false);
            setLoading(false);
            setSuccess(true);
          } else {
            setStkQueryLoading(false);
            setLoading(false);
            setErrorMessage("Payment completed but failed to update status");
          }
        } else {
          setStkQueryLoading(false);
          setLoading(false);
          setErrorMessage(data?.ResultDesc || "Payment failed");
        }
      }
    } catch (error) {
      setStkQueryLoading(false);
      setLoading(false);
      setErrorMessage("Failed to verify payment status");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = {
      mpesa_number: dataFromForm.mpesa_phone.trim(),
      name: dataFromForm.name.trim(),
      amount: Number(dataFromForm.amount),
    };

    if (!formData.name.trim()) {
      setLoading(false);
      setErrorMessage("Please enter your name");
      return;
    }

    if (!formData.mpesa_number.trim()) {
      setLoading(false);
      setErrorMessage("Please enter your M-Pesa number");
      return;
    }

    if (!formData.amount || formData.amount < 1) {
      setLoading(false);
      setErrorMessage("Minimum donation amount is 1 KES");
      return;
    }

    const kenyanPhoneNumberRegex =
      /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/;

    if (!kenyanPhoneNumberRegex.test(formData.mpesa_number)) {
      setLoading(false);
      setErrorMessage("Please enter a valid M-Pesa number");
      return;
    }

    const { data: stkData, error: stkError } = await sendStkPush(formData);

    if (stkError) {
      setLoading(false);
      setErrorMessage(stkError);
      return;
    }

    const checkoutRequestId = stkData.CheckoutRequestID;
    stkPushQueryWithIntervals(checkoutRequestId);
  };

  return (
    <>
      {stkQueryLoading ? (
        <STKPushQueryLoading number={dataFromForm.mpesa_phone} />
      ) : success ? (
        <PaymentSuccess />
      ) : (
        <div className="lg:pl-12">
          <div className="overflow-hidden rounded-md bg-white">
            <div className="p-6 sm:p-10">
              <p className="mt-4 text-base text-gray-600">
                Provide your name, mpesa number and amount to process donation.
              </p>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Name
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        required
                        name="name"
                        value={dataFromForm.name}
                        onChange={(e) =>
                          setDataFromForm({
                            ...dataFromForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-orange-500 transition-all duration-200 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      M-Pesa Number
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        required
                        name="mpesa_number"
                        value={dataFromForm.mpesa_phone}
                        onChange={(e) =>
                          setDataFromForm({
                            ...dataFromForm,
                            mpesa_phone: e.target.value,
                          })
                        }
                        placeholder="e.g., 0712345678"
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-orange-500 transition-all duration-200 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Amount (KES)
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="number"
                        required
                        min="1"
                        step="1"
                        name="amount"
                        value={dataFromForm.amount}
                        onChange={(e) =>
                          setDataFromForm({
                            ...dataFromForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="Enter amount (min: 1 KES)"
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-orange-500 transition-all duration-200 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      />
                      <div className="mt-1 text-sm text-gray-500">
                        Minimum donation: 1 KES
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-orange-600 focus:bg-orange-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Processing..." : "Proceed With Payment"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 text-center text-red-500">{errorMessage}</div>
      )}
    </>
  );
}

export default PaymentForm; 