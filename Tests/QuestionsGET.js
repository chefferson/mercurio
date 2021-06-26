/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '1s',
};

export default function () {
  http.get('http://localhost:3000/qa/questions?product_id=351851');
  sleep(1);
}
