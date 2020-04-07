import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
} from 'react-icons/md';

import { ApplicationState } from '../../store';
import * as CartActions from '../../store/modules/cart/actions';
import { CartsData } from '../../store/modules/cart/types';

import { formatPrice } from '../../util/format';
import { Container, Total, EmptyContainer } from './styles';

export default function Cart() {
  const dispatch = useDispatch();

  const total = useSelector((state: ApplicationState) =>
    formatPrice(
      state.cart.data.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0
      )
    )
  );

  const cartProducts = useSelector((state: ApplicationState) =>
    state.cart.data.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  function increment(product: CartsData) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product: CartsData) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      {cartProducts.length ? (
        <>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>PRODUTO</TableCell>
                <TableCell>DETALHE</TableCell>
                <TableCell>QTD</TableCell>
                <TableCell>SUBTOTAL</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cartProducts.map((item) => (
                <TableRow key={String(item.id)}>
                  <TableCell component="th" scope="row">
                    <img
                      src={item.picture}
                      alt={item.brand}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://imagens.canaltech.com.br/produto/1566226639-7141-principal-p.png';
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <strong>{item.title}</strong>
                    <span>{item.priceFormatted}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <button type="button" onClick={() => decrement(item)}>
                        <MdRemoveCircleOutline size={20} color="#4b195f" />
                      </button>
                      <input type="number" readOnly value={item.amount} />
                      <button type="button" onClick={() => increment(item)}>
                        <MdAddCircleOutline size={20} color="#4b195f" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{item.subtotal}</strong>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(CartActions.removeFromCart(item.id))
                      }
                    >
                      <MdDelete size={25} color="#4b195f" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <footer>
            <button type="button">Finalizar pedido</button>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      ) : (
          <EmptyContainer>
            <MdRemoveShoppingCart size={70} color="#eee" />
            <strong>Seu carrinho está vazio.</strong>
          </EmptyContainer>
        )}
    </Container>
  );
}
