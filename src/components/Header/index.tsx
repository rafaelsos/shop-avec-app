import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { MdShoppingCart } from 'react-icons/md';

import { ApplicationState } from '../../store';

import { Container, Cart, StyledBadge } from './styles';

export default function Header() {
  const cartSize = useSelector(
    (state: ApplicationState) => state.cart.data.length
  );

  return (
    <Container>
      <Link to="/">
        <img
          src="https://media.graphcms.com/resize=width:221,height:32/compress/IxCWTZDZQaS0BXV4n59P"
          alt="AvecShop"
        />
      </Link>
      <Cart to="/cart">
        <IconButton>
          <StyledBadge badgeContent={cartSize} color="secondary">
            <MdShoppingCart size={30} color="#4b195f" />
          </StyledBadge>
        </IconButton>
      </Cart>
    </Container>
  );
}
