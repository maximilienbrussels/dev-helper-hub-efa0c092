# Academy volledig drietalig en inhoudelijk vernieuwd

## Doel
De volledige Academy werkt consequent in Nederlands, Frans en Engels. De gekozen taal blijft in de URL en bepaalt alle kaartteksten, vragen, antwoorden, feedback, rondeschermen, diploma’s en certificaten. Elke dieren-Academy krijgt een degelijke, leeftijdsgeschikte vragenbank met echte variatie.

## Wat ik ga bouwen

### 1. Taalroutes en taalvastheid herstellen
- Controleren en herstellen dat `/nl/academie/...`, `/fr/academie/...` en `/en/academy/...` tijdens de hele quiz in dezelfde taal blijven.
- De taalkiezer laat dezelfde Academy en dezelfde inhoud zien in de nieuw gekozen taal, zonder terug te vallen naar Nederlands.
- Alle Academy-links, terugknoppen, login/registratie, certificaatstappen en gedeelde links behouden de gekozen taal.
- Nederlands wordt niet langer stil als vervanging getoond wanneer een Franse of Engelse vertaling ontbreekt; onvolledige inhoud wordt niet gepubliceerd.

### 2. Alle 18 dieren-Academy’s inhoudelijk vernieuwen
- Voor elk dier een ruime drietalige vragenbank maken: minimaal 30 bruikbare vragen, verdeeld over kinderen/jongeren en 16+.
- Vragen per dier baseren op relevante thema’s: huisvesting, voeding, sociaal gedrag, dagelijkse zorg, gezondheid/noodgevallen, levensduur, kosten, vakantieopvang, dierenwelzijn en Belgische/Brusselse regels waar relevant.
- Kinderroute: concreet, helder en speelser, zonder misleidende formuleringen.
- 16+-route: realistische scenario’s en geloofwaardige afleiders; geen antwoorden die door hun formulering meteen verraden dat ze juist zijn.
- Essentiële verantwoordelijkheidsvragen markeren zodat iedereen die krijgt.
- Alternatieve formuleringen groeperen, zodat één deelnemer nooit twee varianten van hetzelfde kennisdoel krijgt.
- Geschikte feiten als getalvraag aanbieden, met eenheid en gecontroleerde tolerantie.
- Elke vraag, elk antwoord, elke eenheid en elke uitleg professioneel schrijven in NL, FR en EN.

### 3. Selectie, rondes en beoordeling robuust maken
- Per poging een willekeurige deelset uit de grotere vragenbank kiezen.
- De antwoordvolgorde per poging blijven schudden en met tests bewijzen dat het juiste antwoord niet structureel bovenaan staat.
- Voor 16+ exact drie oplopende rondes tonen: basisbehoeften, dagelijkse zorg/gezondheid en verantwoordelijkheid/noodsituaties.
- Kinderen krijgen één kortere, leeftijdsgeschikte route.
- Verplichte vragen eerlijk over rondes verdelen en dezelfde variantgroep nooit tweemaal tonen.
- Slaaggrenzen per doelgroep en per ronde correct berekenen, ook als een vragenpool tijdelijk kleiner is.

### 4. Duidelijke voortgang en positieve effecten
- Altijd zichtbaar maken: huidige ronde, vraag binnen de ronde, totale voortgang en wat nog resteert.
- Een gekozen antwoord blijft neutraal terwijl het gecontroleerd wordt; een juist antwoord wordt meteen groen met een draaiend/stempelend vinkje of duimpje, een fout antwoord helder rood.
- Kinderen krijgen speelse duimpjes en beperkte confetti; 16+ krijgt rustigere bevestiging.
- Een apart, toegankelijk maakmoment toevoegen wanneer diploma of certificaat wordt opgebouwd, gevolgd door de bestaande viering.
- Animaties respecteren de instelling voor minder beweging.

### 5. Beheer volledig maken
- In beheer alle velden voor NL, FR en EN kunnen bewerken, inclusief getalvragen, eenheden, tolerantie, moeilijkheid, verplichte status en variantgroep.
- Per dier en leeftijdsspoor aantallen, rondedekking en ontbrekende vertalingen zichtbaar maken.
- Publiceren blokkeren zolang actieve vragen of kaartteksten niet volledig drietalig zijn of een ronde onvoldoende vragen heeft.
- Preview per taal en per doelgroep mogelijk maken.

### 6. Gegevens veilig bijwerken
- Een nieuwe, herhaalbaar veilige migratie toevoegen die alle Academy-inhoud bijwerkt zonder afhankelijk te zijn van losse seed-bestanden.
- De vernieuwde kippenvragen en de nieuwe vragenbanken voor alle overige dieren in dezelfde gecontroleerde gegevensstroom opnemen.
- Bestaande behaalde certificaten behouden; alleen Academy-inhoud en instellingen wijzigen.

### 7. Controle en bewijs
- Automatische tests toevoegen voor taalvelden, URL-behoud, drie rondes, leeftijdsfiltering, verplichte vragen, variantgroepen, willekeurige vraagselectie, antwoordschudden en getalvragen.
- Elke Academy automatisch controleren op minimaal aanbod per spoor en volledige NL/FR/EN-dekking.
- In de live preview minstens één Academy volledig doorlopen in NL, FR en EN, op mobiel en desktop, inclusief feedback en eindscherm.
- De gekoppelde gegevens na de migratie opnieuw tellen; pas afronden wanneer alle actieve Academy’s volledige drietalige dekking hebben.

## Technische details
- De bestaande twee sporen blijven leidend: `kids` (6–15) en `16plus`; de inhoud wordt daarbinnen qua toon en moeilijkheid aangepast.
- De drie volwassen rondes gebruiken de bestaande modulestructuur, maar selectie en minimumdekking worden aangescherpt.
- De taal wordt expliciet aan de quizaanvraag meegegeven en server-side gevalideerd, zodat Nederlandse fallback niet ongemerkt kan worden getoond.
- De bestaande certificaten blijven geldig en hun nummers veranderen niet.
