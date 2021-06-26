/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '1s',
};

export default function () {
  http.get('http://localhost:3000/qa/questions/1238366/answers');
  sleep(1);
}
