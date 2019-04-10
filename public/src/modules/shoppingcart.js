import 'dexie';

export const db = new Dexie('shopping_cart');

db.version(1).stores({
  cart: '++id, items, total_price'
});

db.open();

export class newItem {

}