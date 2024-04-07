/* eslint-disable import/prefer-default-export */
import { getBreadCrumbsInfo } from '../../utils/dataAPI';

export function loader() {
  throw new Response('Сторінку не знайдено', { status: 404 });
}

export async function action({ request }) {
  const requestList = await request.json();

  const data = await getBreadCrumbsInfo(requestList);

  return data;
}
