import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ApplicationState } from '../../store';
import { CartsData } from '../../store/modules/cart/types';
import * as CartActions from '../../store/modules/cart/actions';

import DetailProduct from '../../components/DetailProduct';
import {
  Container,
  ListProduct,
  Product,
  ButtonProduct,
  ButtonAddCart,
} from './styles';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<CartsData[]>();
  const [productDialog, setProductDialog] = useState<CartsData>();

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<CartsData[]>('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    setOpen(false);

    loadProducts();
  }, []);

  const amount = useSelector((state: ApplicationState) =>
    state.cart.data.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  function handleAddProduct(id: number) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function handleOpenDialog(product: CartsData) {
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
        {products?.map((item) => (
          <Product key={String(item.id)}>
            <ButtonProduct type="button" onClick={() => handleOpenDialog(item)}>
              <div>
                <img
                  src={item.picture}
                  alt={item.brand}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://imagens.canaltech.com.br/produto/1566226639-7141-principal-p.png';
                    e.currentTarget.onerror = null;
                  }}
                />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.priceFormatted}</span>
                </div>
              </div>
            </ButtonProduct>
            <ButtonAddCart
              type="button"
              onClick={() => handleAddProduct(item.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {amount[item.id] || 0}
              </div>
              <span>COMPRAR</span>
            </ButtonAddCart>
          </Product>
        ))}
      </ListProduct>
    </Container>
  );
}
