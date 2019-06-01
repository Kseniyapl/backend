// Notes for backend for Vendme
Set up auth
created /register and /login endpoints


Available routes:

usersRouter - /api/users:
  get user by id - /:id;
  post user - /;
  delete user - /:id;
  -->need to create put user

vendorRouter - /api/vendor:
  get vendor by id - /:id;
  post vendor - /;
  delete vendor - /:id;
  put vendor - /:id;
  get stalls by vendor id - /:id/stalls;

marketRouter - /api/market:
  get market by id - /:id;
  post market - /;
  delete market - /:id;
  put market - /:id;
  get stalls by market Id - /:id/stalls;

stallRouter - /api/stalls:
  get stall by id - /:id;
  post stall - /;
  delete stall - /:id;
  put stall - /:id;
  get all sizes bu the vendors ID - /:id/size;
 
authRouter - /auth:
  registration - /register;
  login - /login;

