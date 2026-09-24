# Academy: laatste open punten afwerken

De grote stukken (resultatenscherm, meting, toetsenbord, QR-scanner, ondertekende certificaten) staan er. Dit rondt de resterende punten af.

## 1. Rustige variant bij beperkte beweging
- Wie op zijn toestel "minder beweging" heeft ingesteld, krijgt geen confetti of springende duimpjes meer, maar een statisch vinkje en badge met dezelfde vrolijke tekst.
- De certificaat-animatie wordt dan een zachte verschijning zonder draaien of vliegen.
- Geluid blijft optioneel en los van deze instelling.

## 2. Kleurcontrast nakijken
- Groen/rood feedback, badges en knoppen in de quiz toetsen aan AA; te lichte tinten donkerder zetten via de bestaande kleurvariabelen.

## 3. Eigen geheime sleutel voor certificaat-QR's
- Een aparte, willekeurig gegenereerde sleutel instellen zodat de QR-handtekeningen niet meer leunen op een sleutel die ook elders gebruikt wordt.
- Let op: certificaten die al een ondertekende QR kregen onder de oude sleutel tonen daarna "niet ondertekend" (gegevens blijven geldig). Nieuwe weergaven krijgen automatisch de nieuwe handtekening.

## 4. Controle in drie talen
- Volledige quizrun in NL, FR en EN (kids en 16+) met toetsenbord, controleren dat de poging in "Academy-resultaten" verschijnt, certificaat aanmaken, QR-link openen en het certificaatbeeld + pdf zien.
- Takenlijst bijwerken en afvinken wat af is.

## Technisch
- `academy-quiz.tsx`: `usePrefersReducedMotion`-hook (matchMedia in useEffect); confetti/animaties conditioneel, statische fallback.
- `secrets--generate_secret` voor `CERT_QR_SECRET` (64 tekens).
- Tests: aggregatie in `getAcademyStats` (pure helper extraheren) en toetsenbordlogica van de antwoordopties.
- Playwright-run op localhost:8080 voor de drie talen; `roadmap.md` bijwerken.
