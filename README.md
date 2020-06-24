## Fastify startup kit


this is a small fastify startup to start your journey using fastfiy.io framework
it's a headless well structured project that helps you boost your code.


# Database
>    We need create users auth for our database:
>    ```shell
>       # connect to mongodb as admin <mongo -u admin> and execute
>       use fastify-dev;
>       db.createUser({user:"amine",pwd:"Mypwd", roles:[{role: "readWrite", db:"fastify-dev"}]}):
>       db.createUser({user:"oussama",pwd:"oussamaboumaad", roles:[{role: "readWrite", db:"fastify-dev"}]})

After that we need to add `MONGO_URL` to `.env`
```shell
GO_URL=mongodb://amine@Mypwd@localhost:27017/fastify-dev
```


# Install dependencies and run the application
- ***first time use run :***
  ```shell
  yarn
  ```
- ***run application:***
  ```shell
  yarn start
  ```