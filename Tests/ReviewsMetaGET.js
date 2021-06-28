/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '1s',
};

export default function () {
  const url = 'http://localhost:3000/reviews/meta';

  const productID = Math.floor(Math.random() * 1000000);

  const body = {
    product_id: productID,
  };

  http.request('GET', url, body);
  sleep(1);
}
