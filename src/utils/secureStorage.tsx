import * as SecureStore from "expo-secure-store";

/**
 * Проверяем, доступно ли SecureStore (некоторые сборки Expo Web возвращают undefined)
 */
async function isSecureStoreAvailable() {
  try {
    await SecureStore.getItemAsync("__test__");
    return true;
  } catch {
    return false;
  }
}

export const secureStorage = {
  /**
   * Сохраняет значение по ключу
   */
  async setItem(key: string, value: string): Promise<void> {
    const available = await isSecureStoreAvailable();
    if (available) {
      await SecureStore.setItemAsync(key, value);
    } else {
      console.warn("[secureStorage] SecureStore недоступен, используем fallback (in-memory)");
      globalThis.__memoryStore = globalThis.__memoryStore || {};
      globalThis.__memoryStore[key] = value;
    }
  },

  /**
   * Получает значение по ключу
   */
  async getItem(key: string): Promise<string | null> {
    const available = await isSecureStoreAvailable();
    if (available) {
      return await SecureStore.getItemAsync(key);
    } else {
      return globalThis.__memoryStore?.[key] || null;
    }
  },

  /**
   * Удаляет значение по ключу
   */
  async deleteItem(key: string): Promise<void> {
    const available = await isSecureStoreAvailable();
    if (available) {
      await SecureStore.deleteItemAsync(key);
    } else {
      if (globalThis.__memoryStore) {
        delete globalThis.__memoryStore[key];
      }
    }
  },
};

declare global {
  var __memoryStore: Record<string, string> | undefined;
}

