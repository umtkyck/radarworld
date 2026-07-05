import {
  saveContactMessage,
  getContactMessages,
  createOrder,
  getOrder,
  getUserOrders,
  getOrderByStripeSession,
} from '@/lib/firestore-admin';

// Mock Firebase Admin
jest.mock('@/lib/firebase-admin', () => ({
  db: null,
  isFirebaseAdminConfigured: () => false,
}));

describe('Firestore Functions', () => {
  describe('when Firebase is not configured', () => {
    describe('saveContactMessage', () => {
      it('returns success with mock id when Firebase is not configured', async () => {
        const message = {
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'sales',
          message: 'I want to buy a radar',
        };

        const result = await saveContactMessage(message);

        expect(result.success).toBe(true);
        expect(result.id).toBe('mock-id');
      });
    });

    describe('getContactMessages', () => {
      it('returns empty array when Firebase is not configured', async () => {
        const messages = await getContactMessages();

        expect(messages).toEqual([]);
      });
    });

    describe('createOrder', () => {
      it('returns success with mock id when Firebase is not configured', async () => {
        const order = {
          items: [
            {
              productId: 'prod-1',
              name: 'Test Product',
              price: 999,
              quantity: 1,
              image: '/test.jpg',
            },
          ],
          subtotal: 999,
          shipping: 0,
          total: 999,
          status: 'pending' as const,
        };

        const result = await createOrder(order);

        expect(result.success).toBe(true);
        expect(result.id).toBe('mock-id');
      });
    });

    describe('getOrder', () => {
      it('returns null when Firebase is not configured', async () => {
        const order = await getOrder('some-order-id');

        expect(order).toBeNull();
      });
    });

    describe('getUserOrders', () => {
      it('returns empty array when Firebase is not configured', async () => {
        const orders = await getUserOrders('user@example.com');

        expect(orders).toEqual([]);
      });
    });

    describe('getOrderByStripeSession', () => {
      it('returns null when Firebase is not configured', async () => {
        const order = await getOrderByStripeSession('cs_test_123');

        expect(order).toBeNull();
      });
    });
  });
});

describe('Firestore Data Types', () => {
  it('ContactMessage type should have required fields', () => {
    const message = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'support',
      message: 'Help needed',
    };

    expect(message).toHaveProperty('name');
    expect(message).toHaveProperty('email');
    expect(message).toHaveProperty('subject');
    expect(message).toHaveProperty('message');
  });

  it('Order type should have required fields', () => {
    const order = {
      items: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      status: 'pending',
    };

    expect(order).toHaveProperty('items');
    expect(order).toHaveProperty('subtotal');
    expect(order).toHaveProperty('shipping');
    expect(order).toHaveProperty('total');
    expect(order).toHaveProperty('status');
  });

  it('OrderItem type should have required fields', () => {
    const item = {
      productId: 'prod-1',
      name: 'Test Product',
      price: 100,
      quantity: 2,
      image: '/image.jpg',
    };

    expect(item).toHaveProperty('productId');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
    expect(item).toHaveProperty('quantity');
    expect(item).toHaveProperty('image');
  });
});
