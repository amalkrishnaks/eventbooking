const Order = require('../models/Order')
const Razorpay = require('razorpay');
const crypto = require("crypto");
const { log } = require('console');
const Event = require('../models/Event');

//placing user order for front-end
module.exports.createOrder = async (req, res) => {
  const instance = new Razorpay({
    key_id: 'rzp_test_0UhirLOMorKmkZ',
    key_secret: '3mBKJeujIV3wPKyH7ypXINvl',
  });
  const { eventId, totalAmount } = req.body;
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "ffff",
  };
  try {
    const order = await instance.orders.create(options);

    const newOrder = new Order({
      eventId: eventId,
      userId: req.userId,
      amount: req.body.amount,
      paymentId: order.id,
      items: req.body.items,
      address: req.body.address,
      ticketCount: req.body.ticketCount || 1,
      status: "pending"
    });

    await newOrder.save();
    res.json({ ...order, ...newOrder.toObject() })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports.verifyOrder = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", '3mBKJeujIV3wPKyH7ypXINvl')
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const payment = await Order.findByIdAndUpdate(orderId, { payment: true, status: 'Confirmed' });

      // Logic for Real-Time Seat Availability
      if (payment && payment.eventId) {
        const event = await Event.findById(payment.eventId);
        const count = payment.ticketCount || 1;
        if (event && event.availableseats >= count) {
          event.availableseats -= count;
          await event.save();

          // Emit real-time update
          const io = req.app.get('io');
          io.emit('seatUpdated', {
            eventId: event._id,
            newAvailableSeats: event.availableseats
          });
        }
      }

      res.json({ message: "Payment successful", payment });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

//user order history for frontend
module.exports.userOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

//listing orders for admin panel
module.exports.listOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

module.exports.updateStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// cancel order controller
module.exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId, userId: req.userId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: "Order is already cancelled" });
    }

    // Update the order status
    order.status = 'Cancelled';
    await order.save();

    // If payment was made, return seats to the event
    if (order.payment && order.eventId) {
      const event = await Event.findById(order.eventId);
      if (event) {
        event.availableseats += order.ticketCount || 1;
        await event.save();

        // Emit real-time update
        const io = req.app.get('io');
        io.emit('seatUpdated', {
          eventId: event._id,
          newAvailableSeats: event.availableseats
        });
      }
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
