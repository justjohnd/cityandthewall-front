import handle from '@/services/routing/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import Router from 'next/router';


// PUT /api/publish/:id
export default async function publishPost(req: NextApiRequest, res: NextApiResponse) {

  const action = 'publish';

  await handle(req, res, action);

  await Router.push('/');

}