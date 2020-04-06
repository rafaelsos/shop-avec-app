import styled from 'styled-components';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin: 30px 0;
  background: #fff;
  padding: 0 5px;
`;

export const Cart = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledBadge = styled(Badge)`
  background: transparent;
  padding: 0 4px;
`;
