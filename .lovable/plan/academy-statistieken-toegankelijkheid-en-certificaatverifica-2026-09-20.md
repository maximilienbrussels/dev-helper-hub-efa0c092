# Academy: statistieken, toegankelijkheid en certificaatverificatie

Drie samenhangende verbeteringen: meetbare resultaten in het beheerportaal, een toegankelijke quiz, en een sluitende, veilige certificaat- en verificatiestroom.

## 1. Beheerdashboard met resultaten

Vandaag bewaart het systeem alleen geslaagde certificaten. Zonder registratie van gestarte en afgebroken examens zijn slagingspercentages en uitvalmomenten niet te berekenen. Daarom komt er eerst meting, dan het dashboard.

**Meten**
- Nieuwe tabel voor examenpogingen: dier, leeftijdscategorie (kids / 16+), taal, starttijd, laatst beantwoorde vraagnummer, ronde, eindscore, geslaagd of afgebroken.
- De quiz meldt: start, elke beantwoorde vraag (alleen positie en resultaat, geen persoonsgegevens) en het einde.
- Kids blijven anoniem: enkel geaggregeerde telling, geen naam of gebruiker.

**Tonen**
Nieuwe portaalpagina "Resultaten" (naast Academy, achter het bestaande rechtenmodel):
- Kerncijfers: aantal pogingen, slagingspercentage, gemiddelde score, mediaan doorlooptijd.
- Vergelijkingstabel en staafgrafiek per dier, per leeftijdscategorie en per taal, met filters die combineerbaar zijn.
- Uitvalgrafiek: percentage deelnemers dat nog actief is per vraagnummer en per ronde, zodat zichtbaar wordt waar mensen afhaken.
- Vraagniveau: percentage juist per vraag, om te zwakke of te moeilijke vragen te vinden.
- Periodefilter (30 / 90 dagen / alles) en export naar CSV.

## 2. Toegankelijke quiz

- Volledige toetsenbordbediening: antwoorden met pijltjes en cijfertoetsen te kiezen, Enter bevestigt, zichtbare focusring overal.
- Schermlezers: vraag en voortgang worden aangekondigd, een beleefde live-regio meldt "juist" of "fout" met de uitleg, focus springt bij een nieuwe vraag naar de vraagtekst.
- Kleurcontrast: feedbackkleuren en badges naar tokens die aan AA voldoen; juist/fout nooit alleen via kleur maar ook via icoon en tekst.
- Gereduceerde beweging: bestaande confetti-uitschakeling blijft; daarnaast een rustige variant van de speelse feedback (statisch vinkje, badge-"pop" zonder beweging) zodat het plezierig blijft.
- Geluid blijft optioneel en uitschakelbaar.

## 3. Certificaat, delen en verificatie

**Delen op het juiste moment**
- Bij het invullen van de naam verdwijnt de deelknop; er staat enkel "Certificaat aanmaken".
- Delen, downloaden, printen en de verificatielink verschijnen pas op de certificaatpagina, nadat het certificaat bestaat.

**Certificaatpagina**
- Toont het certificaat zelf; de QR-code staat op de achterzijde/afdruk en niet in de plaats van het certificaat.

**Verificatiepagina (publiek)**
- Toont na een geldige controle het echte certificaatbeeld (voorzijde) met de gegevens, plus een duidelijke "geldig"-status, en een downloadknop voor een pdf met watermerk "geverifieerd exemplaar".
- De QR-code wordt daar niet meer in plaats van het certificaat getoond, maar als klein extra element.
- Nieuwe QR-scanner op de verificatiepagina: knop "Scan QR-code", camera in de browser, automatische controle van de gescande code. Werkt met toestemming van de gebruiker en heeft een handmatig codeveld als terugval.
- Ongeldige of onbekende codes geven een neutrale, niet-verklappende melding.

**Veiligheid tegen vervalsing**
- Elk certificaat krijgt een server-ondertekende controlewaarde (HMAC met een geheime sleutel) die in de QR-link zit; een zelfgemaakte link of aangepast nummer valideert niet.
- De verificatie controleert handtekening én databankregel; de weergegeven gegevens komen uitsluitend uit de databank, nooit uit de link.
- Bestaande beveiliging blijft: onraadbare token, afgeleide referentiecode, snelheidsbegrenzing per IP, volledige audit van elke controle, en score die enkel server-side wordt berekend.
- De pdf toont de referentiecode, de verificatielink en de datum van uitgifte, zodat een papieren kopie altijd naar de online controle leidt.

## Technisch

- Migratie: tabel `academy_pogingen` (+ index op academy/taal/datum) en kolom met HMAC-versie op `certificaten`; bestaande certificaten blijven geldig via een terugvalpad op de huidige token-controle.
- Serverfuncties: `logAcademyAttempt` / `finishAcademyAttempt` (publiek, gevalideerd, zonder persoonsgegevens) en `getAcademyStats` (beheerder, geaggregeerd in SQL).
- Portaal: nieuwe pagina in `portal-routes.ts` en `PortalShell` nav, grafieken met recharts via de bestaande chart-wrapper.
- QR-scannen met de browser-eigen BarcodeDetector en een lichte fallbackbibliotheek; camera-code enkel client-side geladen.
- Tests: statistiekaggregatie, HMAC-validatie (incl. geknoeide code) en toegankelijkheidsgedrag van de quiz.
