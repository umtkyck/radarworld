import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Types
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

// The Firestore SDK retries silently (e.g. when the Firestore API is disabled
// or rules block the write), which would leave the UI hanging forever.
// Cap writes at a fixed timeout so callers always get an answer.
const WRITE_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore write timed out")), WRITE_TIMEOUT_MS)
    ),
  ]);
}

// Contact Messages
export async function saveContactMessage(message: Omit<ContactMessage, "id" | "createdAt" | "status">) {
  if (!db) {
    console.warn("Firebase not configured - contact message not saved");
    return { success: true, id: "mock-id" }; // Return success for demo purposes
  }

  try {
    const docRef = await withTimeout(
      addDoc(collection(db, "contacts"), {
        ...message,
        status: "new",
        createdAt: serverTimestamp(),
      })
    );
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error };
  }
}

export async function getContactMessages() {
  if (!db) {
    console.warn("Firebase not configured");
    return [];
  }

  try {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactMessage[];
  } catch (error) {
    console.error("Error getting contact messages:", error);
    return [];
  }
}

// Orders
export async function createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">) {
  if (!db) {
    console.warn("Firebase not configured - order not saved");
    return { success: true, id: "mock-id" }; // Return success for demo purposes
  }

  try {
    const docRef = await withTimeout(
      addDoc(collection(db, "orders"), {
        ...order,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    );
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error };
  }
}

export async function getOrder(orderId: string) {
  if (!db) {
    console.warn("Firebase not configured");
    return null;
  }

  try {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Order;
    }
    return null;
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
}

export async function getUserOrders(userEmail: string) {
  if (!db) {
    console.warn("Firebase not configured");
    return [];
  }

  try {
    const q = query(
      collection(db, "orders"),
      where("userEmail", "==", userEmail),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error getting user orders:", error);
    return [];
  }
}

export async function getOrderByStripeSession(sessionId: string) {
  if (!db) {
    console.warn("Firebase not configured");
    return null;
  }

  try {
    const q = query(
      collection(db, "orders"),
      where("stripeSessionId", "==", sessionId)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Order;
    }
    return null;
  } catch (error) {
    console.error("Error getting order by session:", error);
    return null;
  }
}
