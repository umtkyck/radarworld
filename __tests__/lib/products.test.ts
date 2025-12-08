import { products } from '@/data/products';

describe('Products Data', () => {
  it('should have products defined', () => {
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
  });

  it('should have at least one product', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('each product should have required fields', () => {
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('inStock');
      expect(product).toHaveProperty('specifications');
    });
  });

  it('each product should have valid price', () => {
    products.forEach((product) => {
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('each product should have unique id', () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(products.length);
  });

  it('each product should have valid category', () => {
    const validCategories = ['commercial', 'industrial'];
    products.forEach((product) => {
      expect(validCategories).toContain(product.category);
    });
  });

  it('each product specifications should have required fields', () => {
    products.forEach((product) => {
      // All products should have frequency and range at minimum
      expect(product.specifications).toHaveProperty('frequency');
      expect(product.specifications).toHaveProperty('range');
      // Specifications should be an object with at least 2 properties
      expect(Object.keys(product.specifications).length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have products in both categories', () => {
    const commercialProducts = products.filter((p) => p.category === 'commercial');
    const industrialProducts = products.filter((p) => p.category === 'industrial');

    expect(commercialProducts.length).toBeGreaterThan(0);
    expect(industrialProducts.length).toBeGreaterThan(0);
  });

  it('each product image should be a valid URL or path', () => {
    products.forEach((product) => {
      expect(typeof product.image).toBe('string');
      expect(product.image.length).toBeGreaterThan(0);
      // Should start with http, https, or /
      expect(product.image).toMatch(/^(https?:\/\/|\/)/);
    });
  });

  it('inStock should be boolean', () => {
    products.forEach((product) => {
      expect(typeof product.inStock).toBe('boolean');
    });
  });
});

describe('Product Filtering', () => {
  it('can filter products by category', () => {
    const commercialProducts = products.filter((p) => p.category === 'commercial');

    commercialProducts.forEach((product) => {
      expect(product.category).toBe('commercial');
    });
  });

  it('can filter products by price range', () => {
    const affordableProducts = products.filter((p) => p.price < 5000);

    affordableProducts.forEach((product) => {
      expect(product.price).toBeLessThan(5000);
    });
  });

  it('can filter in-stock products', () => {
    const inStockProducts = products.filter((p) => p.inStock);

    inStockProducts.forEach((product) => {
      expect(product.inStock).toBe(true);
    });
  });

  it('can find product by id', () => {
    const firstProduct = products[0];
    const foundProduct = products.find((p) => p.id === firstProduct.id);

    expect(foundProduct).toBeDefined();
    expect(foundProduct?.id).toBe(firstProduct.id);
  });
});

describe('Product Sorting', () => {
  it('can sort products by price ascending', () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);

    for (let i = 1; i < sortedProducts.length; i++) {
      expect(sortedProducts[i].price).toBeGreaterThanOrEqual(sortedProducts[i - 1].price);
    }
  });

  it('can sort products by price descending', () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);

    for (let i = 1; i < sortedProducts.length; i++) {
      expect(sortedProducts[i].price).toBeLessThanOrEqual(sortedProducts[i - 1].price);
    }
  });

  it('can sort products by name alphabetically', () => {
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 1; i < sortedProducts.length; i++) {
      expect(sortedProducts[i].name.localeCompare(sortedProducts[i - 1].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
