# Woolley Cutzz - Bokningssystem

Ett modernt bokningssystem för Woolley Cutzz byggt med React och Vite för att hantera kundbokningar och adminhantering.

## Om Woolley Cutzz

Woolley Cutzz är en exklusiv frisörsalong som erbjuder högkvalitativa frisör- och skönhetstjänster. Vårt bokningssystem är designat för att ge både kunder och personal en smidig och professionell upplevelse.

## Funktioner

- **Kundbokning**
  - Bokningsformulär med val av tjänst, datum och tid
  - Bekräftelsesida efter bokning
  - Profilsida med översikt över bokningar
  - Möjlighet att avboka och ändra bokningar

- **Adminpanel**
  - Översikt över alla bokningar
  - Hantering av bokningsstatus (Bekräftad/Väntar/Avbokad)
  - Statistik och rapporter
  - Hantering av tjänster och priser

- **Användarhantering**
  - Kund- och admininloggning
  - Profilhantering
  - Säker autentisering

## Teknisk Stack

- **Frontend**
  - React
  - Vite
  - Material-UI
  - React Router
  - date-fns

## Installation

1. Klona repot:
```bash
git clone [repo-url]
cd woolley-cutzz
```

2. Installera beroenden:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm run dev
```

## Miljövariabler

Skapa en `.env`-fil i rotmappen med följande variabler:

```env
VITE_API_URL=your_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Bygga för produktion

```bash
npm run build
```

## Licens

MIT 