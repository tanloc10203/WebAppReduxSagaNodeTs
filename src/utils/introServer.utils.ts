export const introServer = {
  SERVER_NAME: 'SERVER API OF END COOL',
  COPY_RIGHT: 'BY END COOL',
  EMAIL_CONTACT: 'ginga550504@gmail.com',
  SERVER_MESSAGE: 'SERVER ON RUNNING',
  SERVER_HOST: process.env.DOMAIN + 'api',
  '[SERVER_API]': {
    '[API: 1]': {
      ROUTE: '/auth',
      ROUTE_CHILDREN: [
        {
          ROUTE: '/register',
          METHOD: 'POST',
        },
        {
          ROUTE: '/login',
          METHOD: 'POST',
        },
        {
          ROUTE: '/refresh',
          METHOD: 'GET',
        },
        {
          ROUTE: '/logout',
          METHOD: 'POST',
        },
        {
          ROUTE: '/forgot-password',
          METHOD: 'POST',
        },
        {
          ROUTE: '/verify-change-password',
          METHOD: 'POST',
        },
      ],
    },
    '[API: 2]': {
      ROUTE: '/member',
      METHOD: ['GET', 'GET/:id', 'POST', 'PATCH', 'DELETE'],
    },
    '[API: 3]': {
      ROUTE: '/product',
      METHOD: ['GET', 'GET/:id', 'POST', 'PATCH', 'DELETE'],
    },
    '[API: 4]': {
      ROUTE: '/product-status',
      METHOD: ['GET', 'GET/:id', 'POST', 'PATCH', 'DELETE'],
    },
    '[API: 5]': {
      ROUTE: '/product-price',
      METHOD: ['GET', 'GET/:id', 'POST', 'PATCH', 'DELETE'],
    },
  },
};
