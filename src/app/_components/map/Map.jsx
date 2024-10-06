'use client';

export default function Map() {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      filter: 'sepia(0.4) saturate(3) hue-rotate(-50deg) brightness(0.9)',
    }}
    >
      <a
        href="https://yandex.ru/maps/org/miragrill/133134107506/?utm_medium=mapframe&utm_source=maps"
        style={{
          color: '#eee', fontSize: '12px', position: 'absolute', top: '0px',
        }}
      >
        MiraGrill
      </a>
      <a
        href="https://yandex.ru/maps/213/moscow/category/restaurant/184106394/?utm_medium=mapframe&utm_source=maps"
        style={{
          color: '#eee', fontSize: '12px', position: 'absolute', top: '14px',
        }}
      >
        Ресторан в Москве
      </a>
      <a
        href="https://yandex.ru/maps/213/moscow/category/banquet_hall/184108315/?utm_medium=mapframe&utm_source=maps"
        style={{
          color: '#eee', fontSize: '12px', position: 'absolute', top: '28px',
        }}
      >
        Банкетный зал в Москве
      </a>
      <iframe
        src="https://yandex.ru/map-widget/v1/org/miragrill/133134107506/?ll=37.639626%2C55.815899&z=15"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        style={{
          position: 'relative',
          borderRadius: '10px',
        //   width: '100%',
        //   height: '100%',
        }}
        title="MiraGrill Map"
      />
    </div>
  );
}
