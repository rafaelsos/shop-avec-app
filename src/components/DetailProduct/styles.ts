import styled from 'styled-components';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const DialogContent = styled(MuiDialogContent)`
  padding: 2px;
  color: #999;
`;

export const Description = styled.div`
  h6 {
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 8px;
  }
`;

export const DialogActions = styled(MuiDialogActions)`
  margin-right: 20px;
  padding: 2px;

  button {
    background: #4b195f;
    color: #fff;
  }
`;
