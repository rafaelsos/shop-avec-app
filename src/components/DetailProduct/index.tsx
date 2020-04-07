import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Dialog,
  Typography,
} from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { CartsData } from '../../store/modules/cart/types';

import { Title, DialogContent, DialogActions, Description } from './styles';

interface Props {
  product?: CartsData;
  openDialog: boolean;
  callbackParent: () => void;
}

export default function DetailProduct({
  openDialog,
  product,
  callbackParent,
}: Props) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  function handleAddProduct(id: number) {
    dispatch(CartActions.addToCartRequest(id));

    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
    callbackParent();
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <Title>
          <Typography variant="h6">Detalhes do produto</Typography>
          <Button autoFocus onClick={handleClose} color="primary">
            <MdClose size={25} color="#4b195f" />
          </Button>
        </Title>

        <DialogContent dividers>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <img src={product?.picture} alt="" />
                </TableCell>
                <TableCell>
                  <Typography color="textPrimary">{product?.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary">
                    {product?.priceFormatted}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Description>
            <Typography variant="h6">Especificações</Typography>
            <Typography gutterBottom>Marca: {product?.brand}</Typography>
            <Typography gutterBottom>Memória: {product?.memory}</Typography>
            <Typography gutterBottom>Chip: {product?.chipType}</Typography>

            <Typography variant="h6">Descrição do produto</Typography>
            <Typography gutterBottom>{product?.description}</Typography>
          </Description>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={() => handleAddProduct(Number(product?.id))}>
            Comprar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
