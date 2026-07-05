import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { db, isFirebaseAdminConfigured } from "./firebase-admin";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  createdAt?: Timestamp;
  status?: "new" | "read" | "replied";
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id?: string;
  userId?: string;
  userEmail?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  stripeSessionId?: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const WRITE_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore write timed out")), WRITE_TIMEOUT_MS)
    ),
  ]);
}

export async function saveContactMessage(
  message: Omit<ContactMessage, "id" | "createdAt" | "status">
) {
  if (!isFirebaseAdminConfigured() || !db) {
    console.warn("Firebase Admin not configured - contact message not saved");
    return { success: true, id: "mock-id" };
  }

  try {
    const docRef = await withTimeout(
      db.collection("contacts").add({
        ...message,
        status: "new",
        createdAt: FieldValue.serverTimestamp(),
      })
    );
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error };
  }
}

export async function createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">) {
  if (!isFirebaseAdminConfigured() || !db) {
    console.warn("Firebase Admin not configured - order not saved");
    return { success: true, id: "mock-id" };
  }

  try {
    const docRef = await withTimeout(
      db.collection("orders").add({
        ...order,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    );
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error };
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!isFirebaseAdminConfigured() || !db) {
    return [];
  }

  try {
    const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactMessage[];
  } catch (error) {
    console.error("Error getting contact messages:", error);
    return [];
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  if (!isFirebaseAdminConfigured() || !db) {
    return null;
  }

  try {
    const doc = await db.collection("orders").doc(orderId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Order;
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
}

export async function getUserOrders(userEmail: string): Promise<Order[]> {
  if (!isFirebaseAdminConfigured() || !db) {
    return [];
  }

  try {
    const snapshot = await db
      .collection("orders")
      .where("userEmail", "==", userEmail)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error getting user orders:", error);
    return [];
  }
}

export async function getOrderByStripeSession(sessionId: string): Promise<Order | null> {
  if (!isFirebaseAdminConfigured() || !db) {
    return null;
  }

  try {
    const snapshot = await db
      .collection("orders")
      .where("stripeSessionId", "==", sessionId)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Order;
  } catch (error) {
    console.error("Error getting order by session:", error);
    return null;
  }
}
