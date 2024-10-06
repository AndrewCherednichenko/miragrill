'use client';

import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'; // Использование только необходимых хуков

import IconButton from '@mui/joy/IconButton';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { fetchProductsFx, productsStore } from '../../_components/store/store';

function ProductPage() {
  const [searchParams] = useSearchParams();
  const path = usePathname();
  const pathname = path.split('/')[path.split('/').length - 1];
  //   console.log(pathname);
  //   console.log(pathname.split('/')[pathname.split('/').length - 1]);

  // Обеспечение наличия searchParams перед использованием
  //   const category = searchParams ? searchParams.get('category') : null;
  const products = useUnit(productsStore); // Получаем продукты из стора
  // console.log(category, products);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProductsFx(); // Загрузка продуктов, если они ещё не загружены
  }, []);

  useEffect(() => {
    // Фильтрация продуктов по категории, используя URL параметр
    // if (products.length > 0 && category) {
    // const filtered = products.filter((prod) => prod.category.data.attributes.link === category);
    if (products.length > 0) {
      const filtered = products.filter((prod) => prod.attributes.link === pathname);
      setFilteredProducts(filtered);
    //   console.log(filtered[0].attributes.prodname);
    }
  }, [products]);
  //   }, [products, category]);
  console.log(filteredProducts);

  if (filteredProducts.length > 0) {
    return (
      <div>
        <h1>
          {filteredProducts[0].attributes.prodname}
        </h1>
        <h2>
          {filteredProducts[0].attributes.price}
          {' '}
          ₽
        </h2>
        <p>
          {filteredProducts[0].attributes.product_article}
        </p>
        <img alt={filteredProducts[0].attributes.prodname} src={`http://localhost:1337${filteredProducts[0].attributes.prodimg.data.attributes.url}`} />
        {filteredProducts[0].attributes.shopit ? (
          <h3>+ количество -</h3>
        ) : (
          <h3>только в ресторане</h3>
        )}
        <IconButton aria-label="Open in new tab" component="a" href="#">
          <OpenInNew />
        </IconButton>
      </div>
    );
  }
}

export default ProductPage;
