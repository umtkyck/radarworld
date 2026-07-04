import { products, getProductsByCategory, getProductsByProblemTag, searchProducts, getFeaturedProducts, categoryInfo, problemTagInfo } from '@/data/products';

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
      expect(product).toHaveProperty('slug');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('shortDescription');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('inStock');
      expect(product).toHaveProperty('specifications');
      expect(product).toHaveProperty('problemTags');
      expect(product).toHaveProperty('applications');
      expect(product).toHaveProperty('features');
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

  it('each product should have unique slug', () => {
    const slugs = products.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(products.length);
  });

  it('each product should have valid category', () => {
    const validCategories = ['ground-speed', 'sports'];
    products.forEach((product) => {
      expect(validCategories).toContain(product.category);
    });
  });

  it('each product specifications should have required fields', () => {
    products.forEach((product) => {
      expect(product.specifications).toHaveProperty('frequency');
      expect(product.specifications).toHaveProperty('range');
      expect(product.specifications).toHaveProperty('power');
    });
  });

  it('should have products in multiple categories', () => {
    const categories = new Set(products.map(p => p.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  it('each product image should be a valid URL or path', () => {
    products.forEach((product) => {
      expect(typeof product.image).toBe('string');
      expect(product.image.length).toBeGreaterThan(0);
      expect(product.image).toMatch(/^(https?:\/\/|\/)/);
    });
  });

  it('inStock should be boolean', () => {
    products.forEach((product) => {
      expect(typeof product.inStock).toBe('boolean');
    });
  });

  it('each product should have at least one feature', () => {
    products.forEach((product) => {
      expect(Array.isArray(product.features)).toBe(true);
      expect(product.features.length).toBeGreaterThan(0);
    });
  });

  it('each product should have at least one problem tag', () => {
    products.forEach((product) => {
      expect(Array.isArray(product.problemTags)).toBe(true);
      expect(product.problemTags.length).toBeGreaterThan(0);
    });
  });
});

describe('getProductsByCategory', () => {
  it('returns products filtered by category', () => {
    const groundSpeedProducts = getProductsByCategory('ground-speed');
    expect(groundSpeedProducts.length).toBeGreaterThan(0);
    groundSpeedProducts.forEach((product) => {
      expect(product.category).toBe('ground-speed');
    });
  });

  it('returns empty array for non-existent category', () => {
    const result = getProductsByCategory('nonexistent');
    expect(result).toEqual([]);
  });
});

describe('getProductsByProblemTag', () => {
  it('returns products filtered by problem tag', () => {
    const speedProducts = getProductsByProblemTag('speed-measurement');
    expect(speedProducts.length).toBeGreaterThan(0);
    speedProducts.forEach((product) => {
      expect(product.problemTags).toContain('speed-measurement');
    });
  });

  it('returns empty array for non-existent tag', () => {
    const result = getProductsByProblemTag('nonexistent');
    expect(result).toEqual([]);
  });
});

describe('searchProducts', () => {
  it('finds products by name', () => {
    const results = searchProducts('ground speed');
    expect(results.length).toBeGreaterThan(0);
  });

  it('finds products by model number', () => {
    const results = searchProducts('ZLYTGSS01');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].model).toBe('ZLYTGSS01');
  });

  it('finds products by application', () => {
    const results = searchProducts('golf');
    expect(results.length).toBeGreaterThan(0);
  });

  it('is case insensitive', () => {
    const results1 = searchProducts('RADAR');
    const results2 = searchProducts('radar');
    expect(results1.length).toBe(results2.length);
  });

  it('returns empty array for no matches', () => {
    const results = searchProducts('xyznonexistent123');
    expect(results).toEqual([]);
  });
});

describe('getFeaturedProducts', () => {
  it('returns products with badges', () => {
    const featured = getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((product) => {
      expect(product.badge).toBeDefined();
      expect(['new', 'bestseller', 'sale']).toContain(product.badge);
    });
  });
});

describe('Category Info', () => {
  it('has info for all used categories', () => {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach((category) => {
      expect(categoryInfo[category]).toBeDefined();
      expect(categoryInfo[category].name).toBeDefined();
      expect(categoryInfo[category].description).toBeDefined();
    });
  });
});

describe('Problem Tags Info', () => {
  it('has info for all used problem tags', () => {
    const allTags = new Set(products.flatMap(p => p.problemTags));
    allTags.forEach((tag) => {
      expect(problemTagInfo[tag]).toBeDefined();
      expect(problemTagInfo[tag].name).toBeDefined();
      expect(problemTagInfo[tag].description).toBeDefined();
    });
  });
});

describe('Product Filtering', () => {
  it('can filter products by category', () => {
    const sportsProducts = products.filter((p) => p.category === 'sports');
    sportsProducts.forEach((product) => {
      expect(product.category).toBe('sports');
    });
  });

  it('can filter products by price range', () => {
    const affordableProducts = products.filter((p) => p.price < 500);
    affordableProducts.forEach((product) => {
      expect(product.price).toBeLessThan(500);
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
