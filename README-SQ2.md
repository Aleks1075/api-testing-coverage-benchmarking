# Task Manager API

## Teknologistack

Dette projekt er udviklet ved hjælp af følgende teknologier:

- **Node.js** med **Express** til at bygge REST API'et.
- **TypeScript** for type sikkerhed.
- **Jest** til unit tests og integration tests.
- **Postman** til API-testning.
- **Artillery** til load testing.

## Introduktion

Jeg har udviklet en REST API til en Task Manager applikation. API'et understøtter CRUD operationer (Create, Read, Update, Delete) for én enkelt enhed, nemlig tasks. Projektet inkluderer unit tests, integration tests, en code coverage rapport, og en load test, som sikrer en robust og skalerbar applikation.

## Funktionalitet

API'et tilbyder følgende endpoints:

- **POST /tasks**: Opretter en ny task.
- **GET /tasks**: Henter alle tasks.
- **GET /tasks/:id**: Henter en specifik task ved ID.
- **PUT /tasks/:id**: Opdaterer en specifik task ved ID.
- **DELETE /tasks/:id**: Sletter en specifik task ved ID.

## Test og Code Coverage

### Unit Tests

Jeg har skrevet omfattende unit tests for kernefunktionaliteten i API'et. Disse tests fokuserer på at sikre, at de individuelle funktioner i `TaskService`-klassen fungerer som forventet. Eksempler på testede funktioner inkluderer:

- **Tilføjelse af en ny task**: Tester at en ny task oprettes korrekt med de rigtige værdier.
- **Opdatering af en eksisterende task**: Sikrer at en eksisterende task kan opdateres med nye data som titel og status (færdiggjort eller ej).
- **Fjernelse af en task**: Verificerer at en task kan fjernes, og at den ikke længere eksisterer i task listen.

### Integration Tests

Integration tests er implementeret for at sikre, at API'et fungerer som en sammenhængende enhed. Disse tests simulerer virkelige API anmodninger og verificerer, at de forskellige komponenter i systemet arbejder sammen som forventet. Eksempler på integration tests inkluderer:

- **Oprettelse af en ny task via POST /tasks**: Tester hele processen fra at modtage en API anmodning til at gemme en ny task i systemet.
- **Hentning af alle tasks via GET /tasks**: Sikrer at API'et korrekt returnerer en liste over alle oprettede tasks.
- **Opdatering af en task via PUT /tasks/:id**: Verificerer at en task kan opdateres korrekt gennem API'et, og at ændringerne reflekteres i systemet.
- **Sletning af en task via DELETE /tasks/:id**: Tester at en task kan fjernes via API'et, og at den ikke længere kan tilgås bagefter.

### Code Coverage

Jeg har opnået en minimum code coverage på 80% ved hjælp af Jest's indbyggede code coverage værktøjer. Dette sikrer, at størstedelen af koden er dækket af tests, og hjælper med at identificere områder, der kan kræve yderligere testning. Code coverage-rapporten kan findes i `coverage`-mappen og inkluderer en detaljeret rapport over dækkede linjer og funktioner.

Rapporten indeholder følgende dækning:

- **Statements**: 82.35%
- **Functions**: 80.64%
- **Lines**: 83.72%

## API Testing med Postman

Jeg har brugt Postman til at teste alle API endpoints. Dette inkluderer test for korrekte statuskoder (200, 404, 500 osv.) og validering af data, der returneres i response. Postman test scripts og collection filer kan findes i `postman`-mappen i projektet.

## Load Testing med Artillery

Jeg har udført en basic load test på GET /tasks endpointet ved hjælp af Artillery. Testen simulerede 50-100 samtidige brugere over en periode på 60 sekunder. Følgende metrics blev registreret:

- **Total Requests:** 4,500
- **Request Rate:** 74 requests per second
- **Response Time:**
  - **Min:** 0 ms
  - **Max:** 22 ms
  - **Mean:** 0.7 ms
  - **Median:** 1 ms
  - **95th Percentile:** 1 ms
  - **99th Percentile:** 2 ms

Ingen af de virtuelle brugere oplevede fejl, og API'et håndterede belastningen effektivt uden performanceproblemer.

## Refleksion over Coverage og Performance

Jeg har sikret en balance mellem unit tests og integration tests for at opnå en høj code coverage samtidig med at sikre, at systemet fungerer korrekt som en helhed. Code coverage er vigtig for at sikre, at koden er godt testet og for at minimere risikoen for fejl i produktion. Load testing resultaterne viser, at API'et kan håndtere moderat belastning effektivt, og jeg kunne optimere performance yderligere ved at skalere ressourcer eller optimere kodebasen baseret på load test resultaterne.
