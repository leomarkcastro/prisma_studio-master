```sh
docker build -t prisma-studio .
```

```sh
docker run --env-file .env -p 5555:5555 prisma-studio
```