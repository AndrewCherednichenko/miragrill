import Button from '@mui/material/Button';

export default function ArrowLeft({ scrollLeft }) {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={scrollLeft}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '35%',
        left: '2%',
        alignItems: 'center',
        verticalAlign: 'middle',
        fontFamily: 'Cormorant-Bold',
        fontSize: 'calc(15px + (35 - 15) * ((100vw - 300px) / (1200 - 300)))',
        background: '#3c3b34',
        minWidth: '26px', // Устанавливаем минимальную ширину
        width: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
        height: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
        padding: '0px', // Убираем внутренние отступы
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
      ←
    </Button>
  );
}
