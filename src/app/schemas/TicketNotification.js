import mongoose from 'mongoose';

const TicketNotification = new mongoose.Schema(
  {
    ticket: {
      type: Number,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('TicketNotification', TicketNotification);
