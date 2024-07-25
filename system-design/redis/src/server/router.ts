import express from 'express';
import * as Redis from 'redis';

const redisClient = Redis.createClient({
  url: 'redis://localhost:6379',
});

// Connect the Redis client
redisClient
  .connect()
  .then(async () => {
    console.log('redis connected!!!!!!!!');
  })
  .catch((err) => {
    console.error('Redis connection error:', err);
  });

const getOrSetCache = async (key: any, cb: any) => {
  const cache = await redisClient.get(key);
  if (cache) {
    console.log('hit cache');
    return JSON.parse(cache);
  } else {
    console.log('API!');
    const freshData = await cb();
    redisClient.setEx(key, 5, JSON.stringify(freshData));
    return freshData;
  }
};

const router = express.Router();

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

router.post('/add', async (_req, res) => {
  res.status(200).json({ message: 'ok' });
});

router.get('/r/products', async (_req, res) => {
  try {
    const _data = await getOrSetCache('products', async () => {
      const resp = await fetch('https://dummyjson.com/products');
      const data = await resp.json();
      return data;
    });

    return res.json(_data);

    // const cache = await redisClient.get('products');
    // if (cache) {
    //   console.log('hit cache!');
    //   return res.json(JSON.parse(cache));
    // } else {
    //   console.log('API call!');
    //   const resp = await fetch('https://dummyjson.com/products');
    //   const data = await resp.json();
    //   redisClient.setEx('products', 100, JSON.stringify(data));
    //   return res.json(data);
    // }
  } catch (error) {
    console.log(error);
    return res.json();
  }
});

router.get('/r/products/:id', async (_req, res) => {
  try {
    const id = _req.params.id;
    const _data = await getOrSetCache(`product-${id}`, async () => {
      const resp = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await resp.json();
      return data;
    });

    return res.json(_data);
  } catch (error) {
    console.log(error);
    return res.json();
  }
});
export default router;
