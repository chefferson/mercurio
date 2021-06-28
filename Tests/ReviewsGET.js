/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '1s',
};

export default function () {
  const url = 'http://localhost:3000/reviews';

  const sorts = ['newest', 'helpful', 'relevance'];
  const productID = Math.floor(Math.random() * 1000000);
  const sort = sorts[Math.floor(Math.random() * sorts.length)];
  const page = Math.floor(Math.random() * 2);
  const count = Math.floor(Math.random() * 500);

  const body = {
    product_id: productID,
    sort,
    page,
    count,
  };

  http.request('GET', url, body);
  sleep(1);
}
