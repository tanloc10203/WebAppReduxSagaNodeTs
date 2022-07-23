import { Avatar, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ProductImagesAttribute } from 'models';
import { ProductImageMoreMenu } from './ProductImageMoreMenu';

export interface ProductImageTableState {
  data: Array<ProductImagesAttribute>;
}

export default function ProductImageTable({ data }: ProductImageTableState) {
  const isNotData = data.length === 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">URL img</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Boolean(data) &&
            data.map((p, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={p.urlImg} src={p.urlImg} />
                    <Typography variant="subtitle2" noWrap>
                      {p.id}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">{p.urlImg}</TableCell>
                <TableCell align="right">
                  <ProductImageMoreMenu productImgId={p.id as number} />
                </TableCell>
              </TableRow>
            ))}

          {isNotData && (
            <TableRow>
              <TableCell colSpan={6}>Không có ảnh nào trong sản phẩm này</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
