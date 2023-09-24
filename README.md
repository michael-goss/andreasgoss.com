# andreasgoss.com

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```

To develop:

```bash
bun run dev
```

To deploy with Docker locally @ localhost:8080

```bash
docker build -t andreasgoss:latest .
docker run -d -p 8080:80 andreasgoss:latest
```
