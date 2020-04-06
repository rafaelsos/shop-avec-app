import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import DetailProduct from '../../components/DetailProduct';
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
  chipType: string;
  memory: string;
  brand: string;
  priceFormatted: string;
  amount: number;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Cart[]>();
  const [productDialog, setProductDialog] = useState<Cart>();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Cart[]>('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    setOpen(false);

    loadProducts();
  }, []);

  // function handleAddProduct(id: number) { }

  function handleOpenDialog(product: Cart) {
    setProductDialog(product);
    setOpen(true);
  }

  function onChildChanged() {
    setOpen(false);
  }

  return (
    <Container>
      <DetailProduct
        openDialog={open}
        product={productDialog}
        callbackParent={() => onChildChanged()}
      />
      <ListProduct>
        {products?.map((product: Cart) => (
          <Product key={String(product.id)}>
            <ButtonProduct
              type="button"
              onClick={() => handleOpenDialog(product)}
            >
              <div>
                <img src={product.picture} alt={product.brand} />
                <div>
                  <strong>{product.brand}</strong>
                  <strong>{product.memory}</strong>
                  <span>{product.priceFormatted}</span>
                </div>
              </div>
            </ButtonProduct>
            <ButtonAddCart type="button">
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
