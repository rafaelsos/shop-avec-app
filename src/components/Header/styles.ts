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

  a img {
    width: 100%;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledBadge = styled(Badge)`
  padding: 0 4px;
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 10px;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    color: #4b195f;
  }
`;
