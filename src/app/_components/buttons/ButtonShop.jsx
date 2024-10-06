import Button from '@mui/material/Button';

export default function ButtonShop({ handler, symbol }) {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handler}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        lineHeight: '0px',
        // color: 'red',
        // position: 'absolute',
        // top: '35%',
        // left: '2%',
        alignItems: 'center',
        verticalAlign: 'middle',
        fontFamily: 'TTDrugsRegular',
        fontSize: '30px',
        // fontSize: 'calc(15px + (35 - 15) * ((100vw - 300px) / (1200 - 300)))',
        background: '#3c3b34',
        minWidth: '26px', // Устанавливаем минимальную ширину
        width: '30px',
        // width: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
        height: '30px',
        // height: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
        padding: '5px 0 0 1px', // Убираем внутренние отступы
        border: '2px solid white',
        borderRadius: '50%', // Делаем круглую форму
        color: 'white',
        '&:hover': {
          color: '#3c3b34',
          backgroundColor: 'white',
          border: '2px solid #3c3b34',
        },
      }}
    >
      {symbol}
    </Button>
  );
}
