# README-SQ3.md

# Project Summary

## Focus Areas

De vigtigste områder, der blev fokuseret på under implementeringen, er som følger:

- **Mocking**: For at isolere forretningslogik under testning blev mocking brugt for at adskille tests fra eksterne afhængigheder.
- **Static code analysis**: Forsøgte at identificere potentielle problemer tidligt gennem PMD, selvom dette ikke lykkedes fuldt ud.
- **Equivalence Partitioning og Boundary Value Analysis**: Dette blev brugt til at sikre omfattende test af inputs og outputs i API'et.

## Key Tools and Technologies

Følgende værktøjer og teknologier blev brugt i projektet:

- **JavaScript/TypeScript**: Bruges til API-udviklingen.
- **Jest**: Bruges til unit tests og mocking.
- **PMD**: Forsøgt brugt til statisk kodeanalyse (men ikke fuldt implementeret).
- **Jest Code Coverage**: Bruges i stedet for **JaCoCo** til at sikre en testdækning på over 75%.
- **SonarQube**: Ikke brugt i projektet, men kan overvejes som en fremtidig mulighed for dybere kodekvalitetsanalyse.

## Introduktion

Dette dokument beskriver implementeringen af **Task Service** projektet, som fokuserer på at fuldføre kravene fra **Assignment 3: Task Service with Comprehensive Testing, Static Code Analysis, and Reviews**.

### 1. Refine the Task Service

Jeg startede med at raffinere min eksisterende **Task Service**, som håndterer CRUD-operationer for tasks (Create, Read, Update, Delete). Det skal sikres, at:

- **Task title** må ikke være tom.
- **Task description** skal have en minimumslængde på 5 tegn.

Dette blev opnået ved at tilføje valideringslogik i **TaskService**-klassen. Hvis titlen er tom eller beskrivelsen er for kort, kaster systemet en fejl, som beskytter mod ugyldige data.

### 2. Unit Testing with Mocking

Jeg fortsatte med at skrive omfattende **unit tests** for at dække den grundlæggende forretningslogik i **TaskService**. Her blev følgende opnået:

- Jeg skrev tests, der sikrede, at tasks bliver korrekt tilføjet, opdateret og slettet.
- Der blev også tilføjet tests for at verificere, at systemet kaster fejl, når ugyldige data (f.eks. tom titel eller kort beskrivelse) bliver indsendt.
- **Code coverage** blev sikret til over 75%, og der blev brugt mocks for at isolere **TaskService** fra eksterne afhængigheder.

### 3. Test Design Using Equivalence Partitioning and Boundary Value Analysis

I implementerede tests baseret på **Boundary Value Analysis** og **Equivalence Partitioning**. Testresultaterne bekræfter, at disse funktioner blev korrekt implementeret:

#### Boundary Value Analysis:

Jeg testede minimums- og maksimumslængden for task-titler:

- **should add a task with the minimum valid title length**: Dette bekræfter, at en task kan tilføjes med en minimumslængde af titel.
- **should add a task with the maximum valid title length**: Dette sikrer, at en task kan tilføjes med den maksimale gyldige længde for titlen (255 tegn).
- **should throw error when adding a task with a title longer than 255 characters**: Her blev det bekræftet, at systemet afviser tasks med en titel, der overstiger 255 tegn.

#### Equivalence Partitioning:

Jeg testede gyldige og ugyldige tilstande for en task:

- **should handle valid task states (active, completed)**: Dette bekræfter, at gyldige tilstande som "active" og "completed" håndteres korrekt.
- **should throw error when updating task with invalid state**: Dette sikrer, at ugyldige tilstande ikke accepteres.

Testresultaterne viste følgende:

Test Suites: 4 passed, 4 total
Tests: 21 passed, 21 total
Snapshots: 0 total
Time: 1.87 s, estimated 2 s
Disse tests bekræfter, at systemet korrekt håndterer både Boundary Value Analysis og Equivalence Partitioning

### 4. PMD Static Code Analysis

Jeg installerede og forsøgte at køre **PMD** for statisk kodeanalyse i projektet. Efter installationen af **PMD-bin** og de nødvendige regler blev følgende kommando forsøgt kørt:

npx pmd-bin --dir ./src --format text --rulesets category/javascript/codestyle.xml

Desværre var resultatet ikke som forventet, og jeg vil undersøge yderligere for at få analyseresultaterne ud fra PMD.

# Software Review Rapport

Efter at have gennemført en detaljeret review af Task Service kodebasen, blev flere aspekter af funktionel korrekthed, non-funktionelle krav og overholdelse af best practices vurderet. Her er de centrale fund og refleksioner:

## Funktionel Korrekthed:

Task Service opfylder sin funktionalitet. Koden håndterer korrekt alle CRUD-operationer (Create, Read, Update, Delete) og sikrer, at tasks kan oprettes, læses, opdateres og slettes uden fejl. Den implementerede valideringslogik fungerer som forventet og forhindrer oprettelse af tasks med tomme titler eller beskrivelser, der er kortere end fem tegn. Alle tests, der verificerer disse funktionaliteter, blev bestået, hvilket bekræfter, at det fungerer korrekt.

## Non-Funktionelle Aspekter:

Ydelsen af servicen er tilstrækkelig til det nuværende brugsscenarie. Da den arbejder med en in-memory data store, er svartiderne øjeblikkelige for små datasæt. Dog kan yderligere test være nødvendige, når servicen skaleres til større datasæt, især hvis en database integreres.

Med hensyn til vedligeholdelse er koden struktureret på en modulær måde. Ansvarsområderne er klart opdelt mellem service- og controller-lagene, hvilket gør det lettere at foretage fremtidige ændringer eller forbedringer uden risiko for at bryde eksisterende funktionalitet. Koden er også yderst testbar med over 80% dækning gennem en kombination af unit og integration tests. Mocking af eksterne afhængigheder sikrer isoleret test af forretningslogikken, hvilket yderligere øger tilliden til serviceens korrekthed.

## Best Practices:

Task Service følger gode kodningspraksis. Fejlhåndtering er omfattende, og valideringsregler håndhæves konsekvent i hele servicen. Brug af TypeScript sikrer, at koden drager fordel af stærk typing, hvilket reducerer risikoen for runtime-fejl. Koden kunne dog drage fordel af yderligere in-line dokumentation, især på områder hvor der anvendes kompleks forretningslogik eller validering. Selvom funktioner og variabelnavne er beskrivende, ville flere kommentarer forbedre læsbarheden og vedligeholdeligheden af koden.

## Forbedringer:

Et område, der kunne forbedres, er performance testning med større datasæt, især ved integration af en persistent data store som en database. Derudover ville tilføjelse af flere detaljerede in-line kommentarer og forbedring af den overordnede dokumentation af koden gøre servicen mere tilgængelig.

Samlet set er Task Service funktionelt korrekt, velstruktureret og følger industriens best practices. Fremtidige forbedringer kunne fokusere på performanceoptimering og forbedring af kodens klarhed gennem kommentarer og dokumentation.

# Refleksion over Test og Kvalitet

Brugen af forskellige værktøjer og teknikker i test og analyse af Task Service projektet har været afgørende for at sikre både funktionalitet og kodekvalitet. Her følger en refleksion over de væsentligste punkter, der har bidraget til projektets succes.

## Statisk kodeanalyse med PMD og JaCoCo:

Selvom jeg havde udfordringer med at køre **PMD** i dette projekt, er det tydeligt, at værktøjer som **PMD** og **JaCoCo** kan forbedre kodekvaliteten ved at sikre, at kode følger best practices og undgår potentielle fejl, såsom null pointer exceptions eller ubrugt kode. De giver også indsigt i, hvor godt koden er dækket af tests, hvilket sikrer en mere robust applikation.

## Importance of Mocking in Unit Testing:

**Mocking** spiller en afgørende rolle i unit testing, især når det drejer sig om at isolere forretningslogikken fra eksterne afhængigheder som databasesystemer eller tredjeparts API'er. Ved at bruge **mocking** i testene af Task Service kunne jeg sikre, at logikken i servicelaget blev testet uafhængigt af eksterne faktorer. Dette gav mig mulighed for at fokusere på kernen i funktionaliteten og øge sikkerheden for, at systemet opfører sig korrekt i isolation.

## Equivalence Partitioning and Boundary Value Analysis:

Brugen af **Equivalence Partitioning** og **Boundary Value Analysis** i testdesignet har gjort det muligt at dække både normale og ekstreme tilfælde i testene. For eksempel blev tests som _"should add a task with the maximum valid title length"_ og _"should throw error when adding a task with a title longer than 255 characters"_ designet for at sikre, at systemet håndterede både gyldige og ugyldige inputs korrekt. Disse teknikker hjalp med at fange potentielle fejl i kanterne af inputdomænet, hvilket forbedrede systemets robusthed.

## Konklusion:

Gennem brugen af disse værktøjer og teknikker har jeg været i stand til at identificere og rette potentielle problemer tidligt i udviklingsprocessen. Dette har resulteret i en stabil og pålidelig **Task Service**.
