import React, { useState, useEffect } from 'react';
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

import { Title, DialogContent, DialogActions, Description } from './styles';

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

interface Props {
  product?: Cart;
  openDialog: boolean;
  callbackParent: () => void;
}

export default function DetailProduct({
  openDialog,
  product,
  callbackParent,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

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
                    {product?.price}
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
          <Button autoFocus onClick={handleClose}>
            Comprar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
