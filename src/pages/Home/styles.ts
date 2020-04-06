import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const ListProduct = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: 0 auto;

  @media all and (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media all and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Product = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
`;

export const ButtonProduct = styled.button`
  border: 0;
  background: #fff;

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    img {
      padding: 20px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      strong {
        font-size: 18px;
        color: #333;
        padding: 10px;
      }

      span {
        font-size: 22px;
        font-weight: bold;
        padding: 10px;
      }
    }
  }
`;

export const ButtonAddCart = styled.button`
  background: #4b195f;
  color: #fff;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  margin: auto 30px 10px 30px;

  padding-right: 10px;

  display: flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.09, '#4b195f')};
  }

  div {
    display: flex;
    align-items: center;
    padding: 10px;
    background: rgba(0, 0, 0, 0.1);

    svg {
      margin-right: 5px;
    }
  }

  span {
    flex: 1;
    font-size: 12px;
    text-align: center;
    font-weight: bold;
  }
`;
