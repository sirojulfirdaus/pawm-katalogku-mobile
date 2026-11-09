import { createContext, useContext, useState } from 'react';

/** @typedef {(typeof import('../data/dummy').products)[number]} Product */
/** @typedef {{ favorites: Product[], addFavorite: (product: Product) => void, removeFavorite: (id: string) => void, toggleFavorite: (product: Product) => void, isFavorite: (id: string) => boolean }} FavoritesValue */

const FavoritesContext = createContext(
  /** @type {FavoritesValue | null} */ (null),
);

/** @param {{ children: import('react').ReactNode }} props */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(/** @type {Product[]} */ ([]));

  /** @param {Product} product */
  function addFavorite(product) {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current
        : [...current, product],
    );
  }

  /** @param {string} id */
  function removeFavorite(id) {
    setFavorites((current) => current.filter((item) => item.id !== id));
  }

  /** @param {Product} product */
  function toggleFavorite(product) {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  }

  /** @param {string} id */
  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
