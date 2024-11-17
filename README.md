# Donner Foundation

* .env
```
DATABASE_URI=mongodb uri
PAYLOAD_SECRET= hexcode
RESEND_API_KEY= for email
NEXT_PUBLIC_SERVER_URL= app url
```

* To run:
```
pnpm install

## with docker
docker compose up

##
pnpm run build && pnpm run start
```

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk
