import { render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Sample product for testing
const mockProduct: Product = {
  id: 'test-product-1',
  name: 'Test Radar Sensor',
  description: 'A test radar sensor for testing',
  price: 999,
  image: '/test-image.jpg',
  category: 'industrial',
  inStock: true,
  specifications: {
    frequency: '77 GHz',
    range: '100m',
    accuracy: '±1mm',
    powerSupply: '24V DC',
    protection: 'IP67',
    temperature: '-40°C to +85°C',
  },
};

const mockProduct2: Product = {
  id: 'test-product-2',
  name: 'Test Radar Sensor 2',
  description: 'Another test radar sensor',
  price: 1499,
  image: '/test-image-2.jpg',
  category: 'commercial',
  inStock: true,
  specifications: {
    frequency: '24 GHz',
    range: '200m',
    accuracy: '±2mm',
    powerSupply: '12V DC',
    protection: 'IP68',
    temperature: '-30°C to +70°C',
  },
};

// Wrapper for hooks
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('useCart hook', () => {
    it('throws error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');

      consoleSpy.mockRestore();
    });

    it('provides initial empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual([]);
      expect(result.current.total).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('adds a product to the cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe(mockProduct.id);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('increments quantity when adding existing product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('adds multiple different products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
    });
  });

  describe('addToCartMultiple', () => {
    it('adds product with specified quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCartMultiple(mockProduct, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('increments existing product quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCartMultiple(mockProduct, 3);
        result.current.addToCartMultiple(mockProduct, 2);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });
  });

  describe('removeFromCart', () => {
    it('removes a product from the cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.removeFromCart(mockProduct.id);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe(mockProduct2.id);
    });

    it('does nothing when removing non-existent product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.removeFromCart('non-existent-id');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('updates the quantity of a product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, 10);
      });

      expect(result.current.items[0].quantity).toBe(10);
    });

    it('removes product when quantity is set to 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('removes product when quantity is negative', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('removes all items from the cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('total calculation', () => {
    it('calculates correct total for single item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.total).toBe(999);
    });

    it('calculates correct total for multiple items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCartMultiple(mockProduct, 2); // 999 * 2 = 1998
        result.current.addToCart(mockProduct2); // 1499 * 1 = 1499
      });

      expect(result.current.total).toBe(3497);
    });

    it('updates total when quantity changes', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.total).toBe(999);

      act(() => {
        result.current.updateQuantity(mockProduct.id, 3);
      });

      expect(result.current.total).toBe(2997);
    });

    it('returns 0 for empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.total).toBe(0);
    });
  });

  describe('localStorage persistence', () => {
    it('saves cart to localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      const savedCart = JSON.parse(localStorageMock.getItem('cart') || '[]');
      expect(savedCart).toHaveLength(1);
      expect(savedCart[0].id).toBe(mockProduct.id);
    });

    it('loads cart from localStorage on mount', () => {
      // Pre-populate localStorage
      localStorageMock.setItem('cart', JSON.stringify([{ ...mockProduct, quantity: 3 }]));

      const { result } = renderHook(() => useCart(), { wrapper });

      // Wait for useEffect to run
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });
  });
});
