import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 10px;
  background: #fff;

  table {
    width: 100%;

    thead th {
      color: #999;
      text-align: left;
      padding: 12px;
    }

    tbody td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }

    img {
      height: 100px;
    }

    strong {
      color: #333;
      display: block;
    }

    span {
      margin-top: 5px;
      font-size: 18px;
      font-weight: bold;
    }

    div {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f5f5f5;

      input {
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #666;
        padding: 6px;
        width: 50px;
      }
    }

    button {
      background: none;
      border: 0;
      padding: 6px;
    }

    @media all and (max-width: 625px) {
      img {
        height: 70px;
      }

      strong {
        font-size: 12px;
      }

      span {
        font-size: 12px;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
          width: 45px;
        }
      }

      svg {
        width: 25px;
      }
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    button {
      background: #4b195f;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#4b195f')};
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    margin-top: 18px;
  }
`;
