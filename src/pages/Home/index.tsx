import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import {
  Container,
  ListProduct,
  Product,
  ButtonProduct,
  ButtonAddCart,
} from './styles';

interface Cart {
  id: number;
  picture: string;
  description: string;
  title: string;
  price: number;
  memory: string;
  brand: string;
  priceFormatted: string;
  amount: number;
}

export default function Home() {
  const [products, setProducts] = useState<Cart[]>();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Cart[]>('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) { }

  return (
    <Container>
      <ListProduct>
        {products?.map((product) => (
          <Product key={String(product.id)}>
            <ButtonProduct type="button" onClick={() => { }}>
              <div>
                <img src={product.picture} alt={product.brand} />
                <div>
                  <strong>{product.brand}</strong>
                  <strong>{product.memory}</strong>
                  <span>{product.priceFormatted}</span>
                </div>
              </div>
            </ButtonProduct>
            <ButtonAddCart
              type="button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />1
              </div>
              <span>COMPRAR</span>
            </ButtonAddCart>
          </Product>
        ))}
      </ListProduct>
    </Container>
  );
}
