// Server-side Firestore operations via Firebase Admin SDK.
// Client pages should call /api/contact and /api/orders instead of importing this directly.
export {
  saveContactMessage,
  createOrder,
  getContactMessages,
  getOrder,
  getUserOrders,
  getOrderByStripeSession,
  type ContactMessage,
  type Order,
  type OrderItem,
} from "./firestore-admin";
