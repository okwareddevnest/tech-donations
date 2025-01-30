export const DonationSchema = {
  name: String,
  phone: String,
  amount: Number,
  mpesaCode: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  checkoutRequestId: String,
  transactionDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}; 