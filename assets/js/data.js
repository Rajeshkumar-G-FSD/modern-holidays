/* ==========================================================================
   MODERN HOLIDAYS — Site content
   Edit this file to update destinations, packages, services, visa and blog.
   Prices: set `price` to a number (per person, INR) once confirmed; null shows
   "Price on request". Nothing here is a live price or availability guarantee.
   ========================================================================== */
(function () {
  const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

  const IMG = {
    machu: '1587595431973-160d0d94add1',
    bali: '1537996194471-e657df975ab4',
    baliRice: '1518548419970-58e3b4079ab2',
    swiss: '1530122037265-a5f1f91d3b99',
    swissLake: '1527668752968-14dc70a27c95',
    maldives: '1514282401047-d79a71a590e8',
    maldives2: '1573843981267-be1999ff37cd',
    thailand: '1552465011-b4e21bf6e79a',
    thaiTemple: '1528181304800-259b08848526',
    singapore: '1525625293386-3f8f99389edd',
    dubai: '1512453979798-5ea266f8880c',
    japan: '1493976040374-85c8e12f0c0e',
    fuji: '1490806843957-31f4c9a91c65',
    vietnam: '1528127269322-539801943592',
    malaysia: '1596422846543-75c6fc197f07',
    paris: '1502602898657-3e91760cbb34',
    italy: '1523906834658-6e24ef2386f9',
    cinque: '1516483638261-f4dbaf036963',
    london: '1513635269975-59663e0ac1ad',
    germany: '1467269204594-9661b134dd2b',
    safari: '1516426122078-c23e76319801',
    egypt: '1539650116574-8efeb43e2750',
    capetown: '1580060839134-75a5edca2e99',
    sydney: '1506973035872-a4ec16b8e8d9',
    nzLake: '1507699622108-4be3abd695ad',
    nzMount: '1469521669194-babb45599def',
    nyc: '1496442226666-8d4d0e62e6e9',
    banff: '1503614472-8c93d56e92ce',
    kerala: '1602216056096-3b40cc0c9944',
    kashmir: '1595815771614-ade9d652a65d',
    beach: '1507525428034-b723cf961d3e',
    mountains: '1464822759023-fed622ff2c3b',
    iceland: '1504893524553-b855bce32c67',
    planning: '1488646953014-85cb44e25828',
    plane: '1436491865332-7a61a109cc05',
    resort: '1566073771259-6a8506099945',
    family: '1511895426328-dc8714191300',
    couple: '1519741497674-611481863552',
    passport: '1544016768-982d1554f0b9',
    office: '1497366216548-37526070297c',
    road: '1469854523086-cc02fe5d8800'
  };

  const continents = [
    { id: 'asia', name: 'Asia', blurb: 'Island escapes, vibrant cities and timeless culture.' },
    { id: 'europe', name: 'Europe', blurb: 'Alpine peaks, art-filled capitals and storybook towns.' },
    { id: 'africa', name: 'Africa', blurb: 'Safaris, ancient wonders and dramatic coastlines.' },
    { id: 'australia', name: 'Australia', blurb: 'Iconic harbours, reefs and wide-open landscapes.' },
    { id: 'new-zealand', name: 'New Zealand', blurb: 'Fjords, lakes and adventure at every turn.' },
    { id: 'americas', name: 'Americas', blurb: 'Skylines, national parks and ancient citadels.' },
    { id: 'india', name: 'India', blurb: 'Backwaters, mountains and heritage closer to home.' }
  ];

  const destinations = [
    // Asia
    { id: 'bali', name: 'Bali', country: 'Indonesia', continent: 'asia', tag: 'Tropical Paradise', img: IMG.bali, desc: 'Temples on sea cliffs, emerald rice terraces and private pool villas made for slow, romantic days.' },
    { id: 'maldives', name: 'Maldives', country: 'Maldives', continent: 'asia', tag: 'Luxury Island Retreat', img: IMG.maldives, desc: 'Over-water villas, glassy lagoons and some of the clearest water you will ever swim in.' },
    { id: 'thailand', name: 'Thailand', country: 'Thailand', continent: 'asia', tag: 'Beaches & Culture', img: IMG.thailand, desc: 'Golden temples, island-hopping, street food and lively nights in Bangkok, Pattaya and Phuket.' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', continent: 'asia', tag: 'City Discovery', img: IMG.singapore, desc: 'Futuristic gardens, Sentosa fun and a spotless, family-friendly city break.' },
    { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', continent: 'asia', tag: 'City & Desert', img: IMG.dubai, desc: 'Record-breaking skylines, golden dunes, souks and world-class shopping.' },
    { id: 'malaysia', name: 'Malaysia', country: 'Malaysia', continent: 'asia', tag: 'Urban & Highlands', img: IMG.malaysia, desc: 'Kuala Lumpur’s skyline, cool Genting Highlands and the beaches of Langkawi.' },
    { id: 'vietnam', name: 'Vietnam', country: 'Vietnam', continent: 'asia', tag: 'Bays & Heritage', img: IMG.vietnam, desc: 'Limestone karsts of Ha Long Bay, historic Hanoi and the energy of Ho Chi Minh City.' },
    { id: 'japan', name: 'Japan', country: 'Japan', continent: 'asia', tag: 'Tradition Meets Future', img: IMG.japan, desc: 'Kyoto’s temples, Tokyo’s neon, Mt Fuji views and bullet-train journeys.' },
    // Europe
    { id: 'switzerland', name: 'Switzerland', country: 'Switzerland', continent: 'europe', tag: 'Alpine Escape', img: IMG.swiss, desc: 'Snow-capped peaks, scenic rail journeys and lakeside towns straight out of a postcard.' },
    { id: 'france', name: 'Paris', country: 'France', continent: 'europe', tag: 'Romance & Art', img: IMG.paris, desc: 'The Eiffel Tower, Seine cruises, the Louvre and long café afternoons.' },
    { id: 'italy', name: 'Italy', country: 'Italy', continent: 'europe', tag: 'History & Coastlines', img: IMG.italy, desc: 'Venice canals, Roman ruins, Tuscan hills and the colourful Cinque Terre.' },
    { id: 'uk', name: 'London', country: 'United Kingdom', continent: 'europe', tag: 'Royal Heritage', img: IMG.london, desc: 'Palaces, museums, West End shows and day trips into the English countryside.' },
    { id: 'germany', name: 'Germany', country: 'Germany', continent: 'europe', tag: 'Castles & Culture', img: IMG.germany, desc: 'Fairytale castles, Bavarian villages and the scenic Rhine valley.' },
    // Africa
    { id: 'kenya', name: 'Kenya Safari', country: 'Kenya', continent: 'africa', tag: 'Wildlife Safari', img: IMG.safari, desc: 'Game drives across the Masai Mara, home to lions, elephants and the Great Migration season.' },
    { id: 'egypt', name: 'Egypt', country: 'Egypt', continent: 'africa', tag: 'Ancient Wonders', img: IMG.egypt, desc: 'The Pyramids of Giza, Nile cruises and the temples of Luxor.' },
    { id: 'south-africa', name: 'Cape Town', country: 'South Africa', continent: 'africa', tag: 'Coast & Winelands', img: IMG.capetown, desc: 'Table Mountain, coastal drives and vineyards just outside the city.' },
    // Australia
    { id: 'sydney', name: 'Sydney', country: 'Australia', continent: 'australia', tag: 'Harbour City', img: IMG.sydney, desc: 'The Opera House, Bondi Beach and the Blue Mountains on your doorstep.' },
    { id: 'australia-coast', name: 'Gold Coast & Reef', country: 'Australia', continent: 'australia', tag: 'Beaches & Theme Parks', img: IMG.beach, desc: 'Sunny beaches, theme parks and gateway trips toward the Great Barrier Reef.' },
    // New Zealand
    { id: 'queenstown', name: 'Queenstown', country: 'New Zealand', continent: 'new-zealand', tag: 'Adventure Capital', img: IMG.nzLake, desc: 'Lakes, peaks, scenic flights and adventure activities for every comfort level.' },
    { id: 'milford', name: 'Milford Sound', country: 'New Zealand', continent: 'new-zealand', tag: 'Fjord Cruises', img: IMG.nzMount, desc: 'Towering cliffs, waterfalls and one of the world’s most scenic cruises.' },
    // Americas
    { id: 'new-york', name: 'New York', country: 'United States', continent: 'americas', tag: 'The Big Apple', img: IMG.nyc, desc: 'Times Square, Central Park, Broadway and the Statue of Liberty.' },
    { id: 'banff', name: 'Banff', country: 'Canada', continent: 'americas', tag: 'Rocky Mountains', img: IMG.banff, desc: 'Turquoise lakes and soaring Rockies in Canada’s most loved national park.' },
    { id: 'peru', name: 'Machu Picchu', country: 'Peru', continent: 'americas', tag: 'Lost City of the Incas', img: IMG.machu, desc: 'The legendary Inca citadel wrapped in Andean clouds.' },
    // India
    { id: 'kerala', name: 'Kerala', country: 'India', continent: 'india', tag: 'Backwaters', img: IMG.kerala, desc: 'Houseboats on palm-fringed backwaters, Munnar’s tea hills and Ayurvedic calm.' },
    { id: 'kashmir', name: 'Kashmir', country: 'India', continent: 'india', tag: 'Paradise on Earth', img: IMG.kashmir, desc: 'Shikara rides on Dal Lake and meadows of Gulmarg, Pahalgam and Sonamarg.' }
  ];

  const defaultExclusions = [
    'Airfare unless mentioned in inclusions',
    'Visa fees (visa assistance available on request)',
    'Travel insurance',
    'Personal expenses, tips and optional activities',
    'Anything not listed under inclusions',
    'GST and TCS as applicable'
  ];

  const packages = [
    {
      id: 'bali-romantic-escape', title: 'Bali Romantic Escape', dest: 'bali', place: 'Bali, Indonesia', continent: 'asia', scope: 'international',
      days: 5, nights: 4, types: ['Honeymoon', 'Couples'], budget: 'mid', price: null, img: IMG.bali, gallery: [IMG.baliRice, IMG.beach, IMG.resort],
      overview: 'A relaxed, romantic introduction to Bali — Ubud’s jungle and rice terraces, a sunset at Uluwatu’s cliff-top temple, and unhurried beach days in the south.',
      highlights: ['Tegallalang rice terraces & Ubud', 'Uluwatu temple sunset & Kecak dance', 'Leisure day at Nusa Dua beaches', 'Private pool villa options'],
      inclusions: ['4 nights’ accommodation', 'Daily breakfast', 'Airport transfers', 'Sightseeing as per itinerary', 'Private vehicle with driver'],
      itinerary: [
        ['Arrive in Bali', 'Meet our representative at Denpasar airport and transfer to your hotel. Evening at leisure.'],
        ['Ubud & Rice Terraces', 'Visit Tegallalang rice terraces, Ubud art market and the Monkey Forest sanctuary.'],
        ['Uluwatu Sunset', 'Afternoon at Uluwatu temple on the cliffs followed by the traditional Kecak fire dance at sunset.'],
        ['Beach Day', 'Free day for Nusa Dua beaches, spa time or optional water sports.'],
        ['Departure', 'Check out and transfer to the airport for your onward flight.']
      ],
      hotel: '4★ hotel or private pool villa — exact property confirmed with your quotation.'
    },
    {
      id: 'thailand-family-holiday', title: 'Thailand Family Holiday', dest: 'thailand', place: 'Pattaya & Bangkok, Thailand', continent: 'asia', scope: 'international',
      days: 5, nights: 4, types: ['Family', 'Groups'], budget: 'value', price: null, img: IMG.thailand, gallery: [IMG.thaiTemple, IMG.beach, IMG.family],
      overview: 'A fun, easy-paced family trip combining Pattaya’s islands with Bangkok’s temples, theme parks and shopping.',
      highlights: ['Coral Island speedboat trip', 'Bangkok temple & city tour', 'Safari World & Marine Park', 'Shopping time in Bangkok'],
      inclusions: ['2 nights Pattaya + 2 nights Bangkok', 'Daily breakfast', 'Airport & intercity transfers', 'Sightseeing as per itinerary'],
      itinerary: [
        ['Arrive Bangkok, transfer to Pattaya', 'Arrival and road transfer to Pattaya. Evening free or optional Alcazar show.'],
        ['Coral Island', 'Speedboat to Coral Island for beaches and optional water sports.'],
        ['Pattaya to Bangkok', 'Transfer to Bangkok with a city and temple tour en route.'],
        ['Safari World & Marine Park', 'Full-day visit with animal shows — a favourite for children.'],
        ['Departure', 'Free time for shopping before your airport transfer.']
      ],
      hotel: '3★ or 4★ family-friendly hotels — confirmed with your quotation.'
    },
    {
      id: 'singapore-city-discovery', title: 'Singapore City Discovery', dest: 'singapore', place: 'Singapore', continent: 'asia', scope: 'international',
      days: 4, nights: 3, types: ['Family', 'Couples'], budget: 'mid', price: null, img: IMG.singapore, gallery: [IMG.singapore, IMG.resort, IMG.plane],
      overview: 'Gardens by the Bay, Sentosa island and the Night Safari — a polished city break that suits families and couples alike.',
      highlights: ['Night Safari experience', 'Gardens by the Bay', 'Sentosa Island & cable car', 'City orientation tour'],
      inclusions: ['3 nights’ accommodation', 'Daily breakfast', 'Airport transfers', 'Attraction tickets as per itinerary'],
      itinerary: [
        ['Arrive & Night Safari', 'Arrive in Singapore, check in and head out to the Night Safari in the evening.'],
        ['City Tour & Gardens by the Bay', 'Merlion Park, Marina Bay, Little India and the Supertree Grove.'],
        ['Sentosa Island', 'Cable car to Sentosa, attractions and the evening show. Universal Studios optional.'],
        ['Departure', 'Shopping time and transfer to Changi Airport.']
      ],
      hotel: '3★ or 4★ city hotel — confirmed with your quotation.'
    },
    {
      id: 'maldives-luxury-retreat', title: 'Maldives Luxury Retreat', dest: 'maldives', place: 'Maldives', continent: 'asia', scope: 'international',
      days: 4, nights: 3, types: ['Honeymoon', 'Luxury'], budget: 'premium', price: null, img: IMG.maldives, gallery: [IMG.maldives2, IMG.beach, IMG.couple],
      overview: 'Three nights of barefoot luxury in a resort of your choice — over-water or beach villas, house reef snorkelling and sunsets on the deck.',
      highlights: ['Beach or water villa stay', 'Speedboat or seaplane transfers', 'House reef snorkelling', 'Optional sunset cruise & spa'],
      inclusions: ['3 nights’ resort stay', 'Meal plan as selected', 'Return resort transfers'],
      itinerary: [
        ['Arrive in Malé', 'Meet & greet at Velana airport, transfer to your resort by speedboat or seaplane.'],
        ['Island Leisure', 'Snorkel the lagoon, unwind at the spa or simply relax on your deck.'],
        ['Optional Experiences', 'Choose a sunset cruise, dolphin watching or a private dinner on the beach.'],
        ['Departure', 'Transfer back to Malé airport.']
      ],
      hotel: '4★ or 5★ island resort — villa category and meal plan confirmed with your quotation.'
    },
    {
      id: 'dubai-city-desert', title: 'Dubai City & Desert Experience', dest: 'dubai', place: 'Dubai, UAE', continent: 'asia', scope: 'international',
      days: 5, nights: 4, types: ['Family', 'Couples', 'Groups'], budget: 'mid', price: null, img: IMG.dubai, gallery: [IMG.dubai, IMG.resort, IMG.plane],
      overview: 'Skyline views from the Burj Khalifa, a dune safari with dinner under the stars and a day trip to Abu Dhabi.',
      highlights: ['Burj Khalifa observation deck', 'Desert safari with BBQ dinner', 'Marina dhow cruise', 'Abu Dhabi city tour'],
      inclusions: ['4 nights’ accommodation', 'Daily breakfast', 'Airport transfers', 'Tours as per itinerary'],
      itinerary: [
        ['Arrive & Dhow Cruise', 'Airport transfer to your hotel; evening dhow cruise with dinner.'],
        ['Dubai City Tour', 'Old and new Dubai, souks, then Burj Khalifa observation deck.'],
        ['Desert Safari', 'Dune drive, camel ride and BBQ dinner with live entertainment.'],
        ['Abu Dhabi Day Trip', 'Sheikh Zayed Grand Mosque and Abu Dhabi highlights.'],
        ['Departure', 'Free time and transfer to the airport.']
      ],
      hotel: '3★ or 4★ hotel — confirmed with your quotation.'
    },
    {
      id: 'switzerland-alpine-adventure', title: 'Switzerland Alpine Adventure', dest: 'switzerland', place: 'Lucerne & Interlaken, Switzerland', continent: 'europe', scope: 'international',
      days: 7, nights: 6, types: ['Honeymoon', 'Family', 'Luxury'], budget: 'premium', price: null, img: IMG.swiss, gallery: [IMG.swissLake, IMG.mountains, IMG.road],
      overview: 'Lakeside Lucerne, Mt Titlis, the Jungfrau region and scenic rail journeys through Switzerland’s alpine heartland.',
      highlights: ['Mt Titlis glacier excursion', 'Jungfraujoch – Top of Europe', 'Lake Lucerne & old town', 'Swiss Travel Pass rail journeys'],
      inclusions: ['6 nights’ accommodation', 'Daily breakfast', 'Swiss Travel Pass', 'Excursions as per itinerary'],
      itinerary: [
        ['Arrive Zurich → Lucerne', 'Train to Lucerne. Evening walk across the Chapel Bridge.'],
        ['Mt Titlis', 'Rotating cable car, glacier cave and snow activities.'],
        ['Lucerne → Interlaken', 'Scenic rail journey via the Brünig pass.'],
        ['Jungfraujoch', 'Cogwheel train to the Top of Europe, Ice Palace and Sphinx terrace.'],
        ['Lauterbrunnen & Lakes', 'Waterfall valley and optional lake cruise on Thun or Brienz.'],
        ['Interlaken → Zurich', 'Rhine Falls visit and Zurich at leisure.'],
        ['Departure', 'Transfer to Zurich airport.']
      ],
      hotel: '3★ or 4★ hotels in Lucerne, Interlaken and Zurich — confirmed with your quotation.'
    },
    {
      id: 'paris-swiss-highlights', title: 'Paris & Switzerland Highlights', dest: 'france', place: 'France & Switzerland', continent: 'europe', scope: 'international',
      days: 8, nights: 7, types: ['Honeymoon', 'Family'], budget: 'premium', price: null, img: IMG.paris, gallery: [IMG.paris, IMG.swissLake, IMG.italy],
      overview: 'The ideal first trip to Europe — Paris for romance and art, then the Swiss Alps by high-speed train.',
      highlights: ['Eiffel Tower & Seine cruise', 'Louvre or Versailles visit', 'TGV train Paris → Switzerland', 'Mt Titlis & Jungfraujoch'],
      inclusions: ['7 nights’ accommodation', 'Daily breakfast', 'Paris–Switzerland train', 'Swiss Travel Pass', 'Excursions as per itinerary'],
      itinerary: [
        ['Arrive Paris', 'Check in, evening Seine river cruise.'],
        ['Paris City & Eiffel Tower', 'Orientation tour and Eiffel Tower visit.'],
        ['Louvre or Disneyland', 'Choose a museum day or a full day at Disneyland Paris.'],
        ['Paris → Lucerne', 'High-speed train to Switzerland.'],
        ['Mt Titlis', 'Glacier excursion with the Rotair cable car.'],
        ['Lucerne → Interlaken', 'Scenic rail journey; evening at leisure.'],
        ['Jungfraujoch', 'Top of Europe excursion.'],
        ['Departure', 'Transfer to Zurich for your flight home.']
      ],
      hotel: '3★ or 4★ hotels — confirmed with your quotation.'
    },
    {
      id: 'japan-tokyo-kyoto', title: 'Japan Tokyo–Kyoto Explorer', dest: 'japan', place: 'Tokyo, Hakone & Kyoto, Japan', continent: 'asia', scope: 'international',
      days: 7, nights: 6, types: ['Couples', 'Family'], budget: 'premium', price: null, img: IMG.japan, gallery: [IMG.fuji, IMG.japan, IMG.road],
      overview: 'Neon Tokyo, Mt Fuji views from Hakone and Kyoto’s temples — linked by Japan’s famous bullet trains.',
      highlights: ['Tokyo city highlights', 'Mt Fuji & Lake Ashi', 'Bullet train to Kyoto', 'Kyoto temples & Nara deer park'],
      inclusions: ['6 nights’ accommodation', 'Daily breakfast', 'Bullet train ticket', 'Sightseeing as per itinerary'],
      itinerary: [
        ['Arrive Tokyo', 'Airport transfer and evening at leisure in Shinjuku.'],
        ['Tokyo City', 'Asakusa, Senso-ji temple, Shibuya crossing and Tokyo Tower views.'],
        ['Mt Fuji & Hakone', 'Day trip to Fuji area and Lake Ashi cruise (weather permitting).'],
        ['Bullet Train to Kyoto', 'Shinkansen ride; evening walk in Gion.'],
        ['Kyoto Temples', 'Fushimi Inari, Kinkaku-ji and Arashiyama bamboo grove.'],
        ['Nara & Osaka', 'Nara’s Todai-ji temple and deer park, evening in Dotonbori.'],
        ['Departure', 'Transfer to Kansai airport.']
      ],
      hotel: '3★ or 4★ hotels — confirmed with your quotation.'
    },
    {
      id: 'vietnam-discovery', title: 'Vietnam Discovery', dest: 'vietnam', place: 'Hanoi, Ha Long & Ho Chi Minh City', continent: 'asia', scope: 'international',
      days: 6, nights: 5, types: ['Couples', 'Groups'], budget: 'value', price: null, img: IMG.vietnam, gallery: [IMG.vietnam, IMG.beach, IMG.road],
      overview: 'North to south Vietnam — Hanoi’s old quarter, a cruise among Ha Long Bay’s limestone islands and the Mekong Delta.',
      highlights: ['Ha Long Bay cruise', 'Hanoi Old Quarter', 'Cu Chi Tunnels', 'Mekong Delta boat trip'],
      inclusions: ['5 nights’ accommodation', 'Daily breakfast', 'Domestic flight Hanoi–HCMC', 'Tours as per itinerary'],
      itinerary: [
        ['Arrive Hanoi', 'Transfer to hotel, evening in the Old Quarter.'],
        ['Hanoi City', 'Hoan Kiem Lake, Temple of Literature and a water-puppet show.'],
        ['Ha Long Bay', 'Day cruise among the limestone karsts with lunch on board.'],
        ['Fly to Ho Chi Minh City', 'Domestic flight and city orientation.'],
        ['Cu Chi & Mekong', 'Cu Chi Tunnels and a Mekong Delta boat excursion.'],
        ['Departure', 'Transfer to the airport.']
      ],
      hotel: '3★ or 4★ hotels — confirmed with your quotation.'
    },
    {
      id: 'malaysia-highlights', title: 'Malaysia Highlights', dest: 'malaysia', place: 'Kuala Lumpur & Genting, Malaysia', continent: 'asia', scope: 'international',
      days: 5, nights: 4, types: ['Family', 'Groups'], budget: 'value', price: null, img: IMG.malaysia, gallery: [IMG.malaysia, IMG.resort, IMG.beach],
      overview: 'Kuala Lumpur’s skyline and food, the cool air of Genting Highlands and a visit to Batu Caves.',
      highlights: ['Petronas Towers & KL city tour', 'Genting Highlands cable car', 'Batu Caves', 'Putrajaya visit'],
      inclusions: ['4 nights’ accommodation', 'Daily breakfast', 'Airport transfers', 'Sightseeing as per itinerary'],
      itinerary: [
        ['Arrive Kuala Lumpur', 'Transfer to hotel; evening at Bukit Bintang.'],
        ['KL City Tour', 'Petronas Towers photo stop, King’s Palace and Merdeka Square.'],
        ['Genting Highlands', 'Cable car ride en route to Batu Caves; theme parks in Genting.'],
        ['Putrajaya', 'Half-day Putrajaya tour; afternoon shopping.'],
        ['Departure', 'Transfer to the airport.']
      ],
      hotel: '3★ or 4★ hotels — confirmed with your quotation.'
    },
    {
      id: 'kerala-backwaters', title: 'Kerala Hills & Backwaters', dest: 'kerala', place: 'Munnar, Thekkady & Alleppey', continent: 'india', scope: 'domestic',
      days: 6, nights: 5, types: ['Family', 'Honeymoon'], budget: 'value', price: null, img: IMG.kerala, gallery: [IMG.kerala, IMG.mountains, IMG.road],
      overview: 'Misty tea estates in Munnar, spice gardens in Thekkady and a night on a private houseboat in Alleppey.',
      highlights: ['Munnar tea gardens', 'Thekkady spice plantation', 'Overnight Alleppey houseboat', 'Private cab throughout'],
      inclusions: ['5 nights incl. 1 night houseboat', 'Breakfast daily, all meals on houseboat', 'Private cab', 'Sightseeing as per itinerary'],
      itinerary: [
        ['Kochi → Munnar', 'Pick-up from Kochi and scenic drive to Munnar past waterfalls.'],
        ['Munnar Sightseeing', 'Tea museum, Mattupetty dam and Echo Point.'],
        ['Munnar → Thekkady', 'Spice plantation visit and optional boating at Periyar.'],
        ['Thekkady → Alleppey', 'Board your private houseboat and cruise the backwaters.'],
        ['Alleppey → Kochi', 'Fort Kochi sightseeing — Chinese fishing nets and heritage streets.'],
        ['Departure', 'Drop at Kochi airport or railway station.']
      ],
      hotel: '3★ or 4★ hotels and a deluxe houseboat — confirmed with your quotation.'
    },
    {
      id: 'kashmir-paradise', title: 'Kashmir – Paradise on Earth', dest: 'kashmir', place: 'Srinagar, Gulmarg & Pahalgam', continent: 'india', scope: 'domestic',
      days: 6, nights: 5, types: ['Honeymoon', 'Family'], budget: 'mid', price: null, img: IMG.kashmir, gallery: [IMG.kashmir, IMG.mountains, IMG.nzMount],
      overview: 'Houseboat nights on Dal Lake and day trips to the meadows of Gulmarg, Pahalgam and Sonamarg.',
      highlights: ['Shikara ride on Dal Lake', 'Gulmarg Gondola (optional)', 'Pahalgam valleys', 'Night in a Dal Lake houseboat'],
      inclusions: ['5 nights incl. 1 night houseboat', 'Breakfast & dinner', 'Private cab', 'Shikara ride'],
      itinerary: [
        ['Arrive Srinagar', 'Check in to a houseboat; evening shikara ride on Dal Lake.'],
        ['Gulmarg', 'Day trip to Gulmarg; optional Gondola ride.'],
        ['Srinagar → Pahalgam', 'Drive via saffron fields to Pahalgam.'],
        ['Pahalgam Valleys', 'Explore Betaab and Aru valleys (local transport at extra cost).'],
        ['Sonamarg', 'Day excursion to the “meadow of gold”.'],
        ['Departure', 'Mughal gardens and drop at Srinagar airport.']
      ],
      hotel: '3★ or 4★ hotels and a deluxe houseboat — confirmed with your quotation.'
    }
  ];
  packages.forEach(p => { p.exclusions = p.exclusions || defaultExclusions; });

  const services = [
    { id: 'international', icon: 'globe', title: 'International Holiday Packages', short: 'Curated holidays across Asia, Europe, Africa, Australia and beyond.', img: IMG.swiss,
      long: 'From island escapes to multi-country tours, we plan international holidays around your dates, budget and travel style — with hotels, transfers, sightseeing and visa guidance handled together.',
      points: ['Ready itineraries or fully tailored trips', 'Hotels, transfers and sightseeing in one quote', 'Visa and travel-document guidance', 'Support before and during your trip'] },
    { id: 'domestic', icon: 'home', title: 'Domestic Holiday Packages', short: 'Kerala, Kashmir, Himachal, Goa, Andaman and more across India.', img: IMG.kerala,
      long: 'Discover India’s hills, backwaters, beaches and heritage with well-paced itineraries, comfortable stays and reliable private transport.',
      points: ['Hill stations, beaches and heritage circuits', 'Private cabs with experienced drivers', 'Houseboats, resorts and boutique stays', 'Weekend getaways from Tamil Nadu'] },
    { id: 'flights', icon: 'plane', title: 'Flight Ticket Assistance', short: 'Domestic and international flight bookings with route guidance.', img: IMG.plane,
      long: 'We help you compare routes, timings and fare types, and book domestic and international flights that fit your itinerary.',
      points: ['Domestic and international bookings', 'Multi-city and group itineraries', 'Guidance on baggage and fare rules', 'Help with date changes where fare rules allow'] },
    { id: 'hotels', icon: 'hotel', title: 'Hotel & Resort Reservations', short: 'Handpicked hotels, villas and resorts for every budget.', img: IMG.resort,
      long: 'From city hotels to private pool villas and island resorts, we suggest stays that match your preferences and location needs.',
      points: ['City hotels, resorts and villas', 'Room-type and meal-plan guidance', 'Family and group room planning', 'Honeymoon special requests'] },
    { id: 'visa', icon: 'passport', title: 'Visa Assistance', short: 'Document checklists, form filling and appointment support.', img: IMG.passport, featured: true,
      long: 'Our team guides you through tourist visa requirements, documentation and application steps for popular destinations. Final decisions always rest with the respective embassy or immigration authority.',
      points: ['Country-specific document checklists', 'Application form filling support', 'Appointment and biometrics guidance', 'Travel insurance and booking documents'] },
    { id: 'honeymoon', icon: 'rings', title: 'Honeymoon Packages', short: 'Romantic escapes with special touches for newlyweds.', img: IMG.maldives2,
      long: 'Celebrate your new beginning in Bali, the Maldives, Switzerland, Kashmir or Kerala, with romantic stays and thoughtful extras arranged on request.',
      points: ['Private villas and water villas', 'Candle-light dinners on request', 'Relaxed, couple-friendly pacing', 'Flexible add-on experiences'] },
    { id: 'groups', icon: 'users', title: 'Family & Group Tours', short: 'Easy, well-paced trips for families, friends and corporate groups.', img: IMG.family,
      long: 'We plan trips that work for all ages — child-friendly activities, comfortable transfers and rooms arranged together for groups.',
      points: ['Child- and senior-friendly pacing', 'Group rooming and coach transfers', 'Corporate and incentive trips', 'Single point of contact'] },
    { id: 'custom', icon: 'route', title: 'Customized Travel Itineraries', short: 'Your trip, your pace — designed from scratch around you.', img: IMG.planning,
      long: 'Tell us your interests, dates and budget. We will design a day-by-day itinerary just for you and refine it until it feels right.',
      points: ['Built from your interests and budget', 'Multiple revisions until it feels right', 'Mix of experiences, stays and pace', 'Transparent, itemised quotation'] }
  ];

  const visaCountries = [
    { name: 'United Arab Emirates', img: IMG.dubai }, { name: 'Singapore', img: IMG.singapore },
    { name: 'Thailand', img: IMG.thaiTemple }, { name: 'Malaysia', img: IMG.malaysia },
    { name: 'Indonesia (Bali)', img: IMG.baliRice }, { name: 'Vietnam', img: IMG.vietnam },
    { name: 'Schengen (Europe)', img: IMG.swissLake }, { name: 'United Kingdom', img: IMG.london },
    { name: 'United States', img: IMG.nyc }, { name: 'Canada', img: IMG.banff },
    { name: 'Australia', img: IMG.sydney }, { name: 'New Zealand', img: IMG.nzLake },
    { name: 'Japan', img: IMG.fuji }, { name: 'Egypt', img: IMG.egypt },
    { name: 'Kenya', img: IMG.safari }, { name: 'South Africa', img: IMG.capetown }
  ];

  const posts = [
    {
      id: 'best-international-destinations-for-indian-travellers', cat: 'Guides', img: IMG.bali, read: '6 min',
      title: 'Best International Destinations for Indian Travellers',
      excerpt: 'Short flights, great value and Indian-friendly food — the destinations that make an easy first trip abroad.',
      body: `<p>Planning your first international holiday? The best destinations for Indian travellers usually combine short flight times, straightforward visa processes, vegetarian-friendly food and plenty to see for every age group.</p>
<h2>1. Thailand</h2><p>Bangkok, Pattaya, Phuket and Krabi offer beaches, temples, shopping and nightlife within a few hours of major Indian cities. It is one of the easiest destinations to plan for families and groups.</p>
<h2>2. Singapore</h2><p>Clean, safe and very well connected, Singapore suits families perfectly. Gardens by the Bay, Sentosa and the Night Safari can comfortably fit into a 4-day trip.</p>
<h2>3. Dubai</h2><p>Skyscrapers, desert safaris and world-class malls make Dubai a favourite for both families and couples. Add a day trip to Abu Dhabi for the Sheikh Zayed Grand Mosque.</p>
<h2>4. Bali &amp; the Maldives</h2><p>For honeymooners, Bali offers culture and variety while the Maldives is all about private, barefoot luxury. Read our <a href="article.html?id=bali-vs-maldives-choosing-your-island-escape">Bali vs Maldives guide</a> to pick the right one.</p>
<h2>5. Switzerland</h2><p>For a first trip to Europe, Switzerland’s scenic trains, snow peaks and lakeside towns are hard to beat — especially when combined with Paris.</p>
<div class="callout">Visa rules and entry requirements change from time to time. Always check the latest official guidance before you book — our team can help you with an up-to-date checklist.</div>`
    },
    {
      id: 'planning-your-first-european-holiday', cat: 'Europe', img: IMG.paris, read: '7 min',
      title: 'Planning Your First European Holiday',
      excerpt: 'When to go, how many countries to cover, and what to know about the Schengen visa process.',
      body: `<p>Europe can feel overwhelming to plan — dozens of countries, endless cities and many ways to get around. Here is a simple approach for your first trip.</p>
<h2>Choose fewer places, see more</h2><p>A 7–10 day first trip works best with two or three bases, for example Paris and Switzerland, or Switzerland and Italy. Fewer hotel changes mean more time actually enjoying each place.</p>
<h2>Best time to travel</h2><p>Late spring (April–June) and early autumn (September–October) bring pleasant weather and fewer crowds. Summer is lively but busier, while winter is ideal for snow in the Alps.</p>
<h2>Getting around</h2><ul><li>High-speed trains connect major cities comfortably.</li><li>A Swiss Travel Pass covers most trains, buses and boats in Switzerland.</li><li>Short internal flights can save time on longer routes.</li></ul>
<h2>The Schengen visa</h2><p>Most popular European countries are part of the Schengen area. You generally apply through the embassy or consulate of the country where you will spend the most nights. Apply well in advance, as appointment availability varies by season.</p>
<div class="callout">Requirements differ by country and change over time. Our visa assistance team can prepare a checklist for your specific itinerary.</div>`
    },
    {
      id: 'bali-vs-maldives-choosing-your-island-escape', cat: 'Islands', img: IMG.maldives, read: '5 min',
      title: 'Bali vs Maldives: Choosing Your Island Escape',
      excerpt: 'Two dream destinations, two very different experiences. Here is how to choose the right one for you.',
      body: `<p>Both Bali and the Maldives top honeymoon wish-lists, but they offer very different holidays.</p>
<h2>Choose Bali if you want variety</h2><ul><li>Temples, rice terraces, waterfalls and cafés</li><li>Private pool villas at a range of budgets</li><li>Plenty of sightseeing and activities</li></ul>
<h2>Choose the Maldives if you want pure relaxation</h2><ul><li>Over-water villas and turquoise lagoons</li><li>Snorkelling and diving straight from your resort</li><li>Total privacy — one island, one resort</li></ul>
<h2>Budget considerations</h2><p>In the Maldives, most costs come from the resort, meal plan and transfer type (speedboat or seaplane). Bali gives you more flexibility to mix luxury nights with more affordable ones.</p>
<h2>Can’t decide?</h2><p>Some couples combine both. Talk to us and we will help you plan a trip that matches your dates and budget.</p>`
    },
    {
      id: 'essential-travel-documents-for-international-holidays', cat: 'Travel Tips', img: IMG.plane, read: '5 min',
      title: 'Essential Travel Documents for International Holidays',
      excerpt: 'A practical checklist so nothing important is left behind before you fly.',
      body: `<p>Missing paperwork is one of the most common causes of travel stress. Use this general checklist before any international trip.</p>
<h2>Core documents</h2><ul><li><strong>Passport</strong> — many countries expect validity of at least six months beyond your travel dates and blank pages for stamps.</li><li><strong>Visa or e-visa</strong> — printed and digital copies.</li><li><strong>Flight tickets</strong> and hotel confirmations.</li><li><strong>Travel insurance</strong> policy document.</li></ul>
<h2>Money &amp; cards</h2><ul><li>Forex card or international-enabled debit/credit card</li><li>Some local currency for arrival</li></ul>
<h2>Keep copies</h2><p>Save scanned copies of your passport, visa and bookings in your email or cloud storage, and carry a set of photocopies separately from the originals.</p>
<div class="callout">This is general guidance. Specific requirements depend on your destination and nationality — please confirm with official sources or ask our team.</div>`
    },
    {
      id: 'family-friendly-holiday-destinations', cat: 'Family', img: IMG.singapore, read: '6 min',
      title: 'Family-Friendly Holiday Destinations',
      excerpt: 'Destinations where kids, parents and grandparents can all have a great time together.',
      body: `<p>The perfect family holiday balances fun for children with comfort for parents and grandparents. These destinations do that particularly well.</p>
<h2>Singapore</h2><p>Safe, clean and compact, with attractions like Sentosa, the zoo and Night Safari that children love.</p>
<h2>Dubai</h2><p>Theme parks, aquariums, desert safaris and family-friendly hotels make Dubai a great all-rounder.</p>
<h2>Thailand</h2><p>Beaches, island trips and Safari World offer variety at good value.</p>
<h2>Kerala</h2><p>Closer to home, a houseboat on the backwaters and the tea hills of Munnar create memories for all ages.</p>
<h2>Tips for family travel</h2><ul><li>Choose fewer hotel changes</li><li>Keep one free afternoon every couple of days</li><li>Pick flights that suit children’s sleep routines</li></ul>`
    },
    {
      id: 'tourist-visa-application-tips', cat: 'Visa', img: IMG.passport, read: '5 min',
      title: 'Tourist Visa Application: Practical Tips',
      excerpt: 'How to prepare a clear, complete tourist visa application and avoid common mistakes.',
      body: `<p>A well-prepared application makes the visa process smoother. While every country has its own rules, these general tips help almost everywhere.</p>
<h2>Start early</h2><p>Appointment availability and processing times vary by season. Applying early leaves room for any additional document requests.</p>
<h2>Be consistent</h2><p>Make sure names, dates and details match across your passport, application form, bookings and supporting documents.</p>
<h2>Show a clear travel plan</h2><ul><li>Day-wise itinerary</li><li>Hotel and flight reservations as required</li><li>Proof of funds and employment or business details</li></ul>
<h2>Follow the official checklist</h2><p>Each embassy publishes its own requirements. Our team prepares a destination-specific checklist and helps you organise your file.</p>
<div class="callout">Visa decisions are made solely by the respective embassy or immigration authority. No agency can guarantee approval.</div>`
    }
  ];

  window.MH_DATA = {
    U, IMG, continents, destinations, packages, services, visaCountries, posts,
    contact: {
      phoneDisplay: '+91 98433 44844',
      phoneTel: '+919843344844',
      whatsapp: '919843344844',
      email: '', // TODO: add official email address, e.g. info@yourdomain.com
      addressLines: ['RPL Plaza, 24/2, Kalaimagal Kalvi Nilayam Rd,', 'Near Savitha Hospital Bus Stop, Kaikolar Thottam,', 'Erode, Tamil Nadu 638001'],
      mapQuery: 'Modern Holidays, RPL Plaza, 24/2 Kalaimagal Kalvi Nilayam Rd, Erode, Tamil Nadu 638001',
      instagram: '#', // TODO: add Instagram profile URL
      facebook: '#'  // TODO: add Facebook page URL
    }
  };
})();
