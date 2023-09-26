# andreasgoss.com

To install dependencies:

```bash
bun install
```

To bundle the application:

```bash
bun run bundle
```

To develop:

```bash
bun run bundle-dev
```

To run the application / run the webserver:

```bash
bun run start
```

To deploy with Docker locally @ localhost:8080

```bash
docker build -t andreasgoss:latest .
docker run -d -p 8080:80 andreasgoss:latest
```
