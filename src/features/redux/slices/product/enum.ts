enum shop {
  'unavailable',
  'available',
}

const shopMap = new Map<number, string>();
shopMap.set(shop.unavailable, 'unavailable');
shopMap.set(shop.available, 'available');

export { shop, shopMap };
