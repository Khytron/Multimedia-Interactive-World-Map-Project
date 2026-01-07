/**
 * Interactive World Map: Culture & History
 * Data Module - Contains all historical and cultural data
 */

// Region data with historical information
const regionsData = {
    asia: {
        id: 'asia',
        name: 'Asia',
        icon: '🏯',
        color: '#E74C3C',
        description: 'Asia is the largest continent, home to ancient civilizations including China, India, and Japan. The Silk Road connected East and West, facilitating trade and cultural exchange for centuries.',
        keyFacts: [
            { icon: '🌏', text: 'Largest continent by area and population' },
            { icon: '📜', text: 'Birthplace of major world religions' },
            { icon: '🛤️', text: 'Historic Silk Road trade routes' },
            { icon: '🏛️', text: 'Ancient civilizations: China, India, Mesopotamia' }
        ],
        viewBox: { x: 650, y: 80, width: 450, height: 300 }
    },
    'middle-east': {
        id: 'middle-east',
        name: 'Middle East',
        icon: '🕌',
        color: '#F39C12',
        description: 'The Middle East is the cradle of civilization, where writing, agriculture, and the first cities emerged. It witnessed the Islamic Golden Age, a period of remarkable scientific and cultural achievement.',
        keyFacts: [
            { icon: '✍️', text: 'Birthplace of writing (cuneiform)' },
            { icon: '🌾', text: 'Origin of agriculture' },
            { icon: '🔬', text: 'Islamic Golden Age innovations' },
            { icon: '📚', text: 'House of Wisdom in Baghdad' }
        ],
        viewBox: { x: 500, y: 150, width: 250, height: 200 }
    },
    europe: {
        id: 'europe',
        name: 'Europe',
        icon: '🏰',
        color: '#3498DB',
        description: 'Europe has been a center of art, philosophy, and innovation. From the glory of Ancient Greece and Rome to the Renaissance and Industrial Revolution, Europe shaped much of world history.',
        keyFacts: [
            { icon: '🎨', text: 'Renaissance artistic revolution' },
            { icon: '🏛️', text: 'Ancient Greek democracy' },
            { icon: '⚙️', text: 'Industrial Revolution origins' },
            { icon: '🗺️', text: 'Age of Exploration' }
        ],
        viewBox: { x: 400, y: 40, width: 250, height: 200 }
    },
    africa: {
        id: 'africa',
        name: 'Africa',
        icon: '🦁',
        color: '#27AE60',
        description: 'Africa is the birthplace of humanity and home to great empires like Mali, Songhai, and Great Zimbabwe. The continent boasts incredible cultural diversity with over 3,000 distinct ethnic groups.',
        keyFacts: [
            { icon: '👣', text: 'Cradle of humankind' },
            { icon: '👑', text: 'Great empires: Mali, Songhai, Aksum' },
            { icon: '🎭', text: 'Over 3,000 ethnic groups' },
            { icon: '📖', text: 'Ancient Egyptian civilization' }
        ],
        viewBox: { x: 350, y: 180, width: 300, height: 400 }
    },
    australia: {
        id: 'australia',
        name: 'Oceania',
        icon: '🦘',
        color: '#9B59B6',
        description: 'Oceania includes Australia, New Zealand, and the Pacific Islands. Australia holds the world\'s oldest continuous culture - Aboriginal Australians have lived on this land for over 65,000 years. Their Dreamtime stories represent one of humanity\'s most ancient spiritual traditions.',
        keyFacts: [
            { icon: '🌟', text: 'World\'s oldest continuous culture' },
            { icon: '🎨', text: 'Ancient rock art traditions' },
            { icon: '🌿', text: 'Unique flora and fauna' },
            { icon: '🗣️', text: 'Over 250 Indigenous languages' }
        ],
        viewBox: { x: 750, y: 340, width: 350, height: 280 }
    }
};

// Historical events data organized by era and region
// Position coordinates are in SVG viewBox units (1200x600)
const historicalEvents = {
    // Ancient Era (-3000 to -500)
    ancient: {
        era: 'Ancient Era',
        yearRange: [-3000, -500],
        events: [
            {
                id: 'pyramids',
                region: 'africa',
                title: 'Great Pyramids of Giza',
                year: -2560,
                position: { x: 52, y: 36 },
                icon: '🔺',
                description: 'The Great Pyramid of Giza was built as a tomb for Pharaoh Khufu. It remained the tallest man-made structure for over 3,800 years.',
                details: 'Standing at 146.6 meters (481 feet), the Great Pyramid was constructed using an estimated 2.3 million stone blocks, each weighing an average of 2.5 tons.',
                keyFigures: ['Pharaoh Khufu', 'Architect Hemiunu'],
                culturalSignificance: 'Symbol of ancient Egyptian engineering and the afterlife beliefs of pharaonic Egypt.'
            },
            {
                id: 'babylon',
                region: 'middle-east',
                title: 'Rise of Babylon',
                year: -1894,
                position: { x: 55, y: 35 },
                icon: '🏛️',
                description: 'Babylon became a major city under King Hammurabi, who created one of the earliest written legal codes.',
                details: 'The Code of Hammurabi contained 282 laws covering commerce, family, labor, and property. It established the principle of "an eye for an eye."',
                keyFigures: ['King Hammurabi'],
                culturalSignificance: 'Foundation of written law and urban governance.'
            },
            {
                id: 'indus-valley',
                region: 'asia',
                title: 'Indus Valley Civilization',
                year: -2600,
                position: { x: 60, y: 38 },
                icon: '🏘️',
                description: 'One of the world\'s earliest urban civilizations, with advanced city planning, drainage systems, and standardized weights.',
                details: 'Cities like Mohenjo-daro and Harappa had populations of 30,000-60,000 with sophisticated urban planning and public baths.',
                keyFigures: ['Unknown rulers - no deciphered records'],
                culturalSignificance: 'Early example of urban planning and standardization.'
            },
            {
                id: 'shang-dynasty',
                region: 'asia',
                title: 'Shang Dynasty China',
                year: -1600,
                position: { x: 75, y: 28 },
                icon: '🐉',
                description: 'The Shang Dynasty developed Chinese writing, bronze casting, and ancestor worship practices.',
                details: 'Oracle bones from this period provide the earliest evidence of Chinese writing. The Shang created sophisticated bronze vessels for religious ceremonies.',
                keyFigures: ['King Tang of Shang', 'King Wu Ding'],
                culturalSignificance: 'Foundation of Chinese civilization and writing system.'
            }
        ]
    },
    
    // Classical Era (-500 to 500)
    classical: {
        era: 'Classical Era',
        yearRange: [-500, 500],
        events: [
            {
                id: 'greek-democracy',
                region: 'europe',
                title: 'Athenian Democracy',
                year: -508,
                position: { x: 46, y: 27 },
                icon: '🏛️',
                description: 'Athens established the world\'s first democracy under the reforms of Cleisthenes.',
                details: 'All male citizens could participate in the assembly. This radical experiment influenced political thought for millennia.',
                keyFigures: ['Cleisthenes', 'Pericles', 'Socrates'],
                culturalSignificance: 'Birth of democratic governance and Western philosophy.'
            },
            {
                id: 'silk-road',
                region: 'asia',
                title: 'Silk Road Established',
                year: -130,
                position: { x: 68, y: 25 },
                icon: '🐪',
                description: 'The Silk Road connected China with the Mediterranean, enabling trade of goods, ideas, and technologies.',
                details: 'The route spanned 6,400 km and facilitated the exchange of silk, spices, paper, gunpowder, and religious ideas.',
                keyFigures: ['Zhang Qian', 'Emperor Wu of Han'],
                culturalSignificance: 'Greatest ancient trade and cultural exchange network.'
            },
            {
                id: 'roman-empire',
                region: 'europe',
                title: 'Roman Empire Peak',
                year: 117,
                position: { x: 42, y: 25 },
                icon: '🦅',
                description: 'Under Emperor Trajan, the Roman Empire reached its greatest territorial extent.',
                details: 'The empire controlled the entire Mediterranean, parts of Mesopotamia, and stretched from Britain to Egypt.',
                keyFigures: ['Emperor Trajan', 'Emperor Hadrian'],
                culturalSignificance: 'Spread of Roman law, language, and engineering across Europe.'
            },
            {
                id: 'aksum-empire',
                region: 'africa',
                title: 'Aksumite Empire',
                year: 100,
                position: { x: 55, y: 52 },
                icon: '⛪',
                description: 'The Aksumite Empire became a major trading power, later adopting Christianity as its state religion.',
                details: 'Aksum was one of the four great powers of the ancient world, along with Rome, Persia, and China.',
                keyFigures: ['King Ezana'],
                culturalSignificance: 'One of the first Christian kingdoms and major African empire.'
            },
            {
                id: 'maurya-empire',
                region: 'asia',
                title: 'Maurya Empire',
                year: -268,
                position: { x: 62, y: 40 },
                icon: '☸️',
                description: 'Emperor Ashoka united most of the Indian subcontinent and spread Buddhism across Asia.',
                details: 'After the bloody Kalinga War, Ashoka converted to Buddhism and promoted non-violence, erecting pillars with moral edicts throughout his empire.',
                keyFigures: ['Emperor Ashoka', 'Chandragupta Maurya'],
                culturalSignificance: 'Spread of Buddhism and concept of dharmic governance.'
            }
        ]
    },
    
    // Medieval Era (500 to 1500)
    medieval: {
        era: 'Medieval Era',
        yearRange: [500, 1500],
        events: [
            {
                id: 'islamic-golden-age',
                region: 'middle-east',
                title: 'Islamic Golden Age',
                year: 800,
                position: { x: 53, y: 35 },
                icon: '📚',
                description: 'The House of Wisdom in Baghdad became a center of learning, translating and preserving Greek texts while advancing mathematics and science.',
                details: 'Scholars made groundbreaking advances in algebra, astronomy, medicine, and chemistry. Al-Khwarizmi\'s work gave us the word "algorithm."',
                keyFigures: ['Al-Khwarizmi', 'Ibn Sina (Avicenna)', 'Al-Razi'],
                culturalSignificance: 'Preservation of classical knowledge and major scientific advances.'
            },
            {
                id: 'tang-dynasty',
                region: 'asia',
                title: 'Tang Dynasty Golden Age',
                year: 700,
                position: { x: 76, y: 27 },
                icon: '🎎',
                description: 'The Tang Dynasty is considered a golden age of Chinese culture, with flourishing poetry, art, and international trade.',
                details: 'Chang\'an (Xi\'an) was the world\'s largest city with over 1 million inhabitants. The Tang period saw the invention of woodblock printing.',
                keyFigures: ['Emperor Taizong', 'Li Bai', 'Du Fu'],
                culturalSignificance: 'Peak of Chinese cultural achievement and international influence.'
            },
            {
                id: 'mali-empire',
                region: 'africa',
                title: 'Mali Empire',
                year: 1312,
                position: { x: 38, y: 50 },
                icon: '👑',
                description: 'Under Mansa Musa, the Mali Empire became one of the wealthiest states in history, with Timbuktu as a center of learning.',
                details: 'Mansa Musa\'s pilgrimage to Mecca in 1324 with tons of gold caused inflation in Egypt. Timbuktu housed the famous Sankore University.',
                keyFigures: ['Mansa Musa', 'Sundiata Keita'],
                culturalSignificance: 'Demonstrated African wealth and scholarship to the world.'
            },
            {
                id: 'mongol-empire',
                region: 'asia',
                title: 'Mongol Empire',
                year: 1260,
                position: { x: 70, y: 22 },
                icon: '🏇',
                description: 'The Mongol Empire became the largest contiguous land empire in history, stretching from Korea to Eastern Europe.',
                details: 'The Pax Mongolica enabled unprecedented trade and cultural exchange across Eurasia. The Mongols established postal systems and religious tolerance.',
                keyFigures: ['Genghis Khan', 'Kublai Khan'],
                culturalSignificance: 'Facilitated global trade and cultural exchange across Eurasia.'
            },
            {
                id: 'great-zimbabwe',
                region: 'africa',
                title: 'Great Zimbabwe',
                year: 1100,
                position: { x: 50, y: 72 },
                icon: '🏰',
                description: 'Great Zimbabwe was a medieval city that served as the capital of the Kingdom of Zimbabwe, known for its massive stone structures.',
                details: 'The stone walls were built without mortar and some reach 11 meters high. The city was a major trading center for gold and ivory.',
                keyFigures: ['Unknown rulers'],
                culturalSignificance: 'Evidence of sophisticated pre-colonial African urban civilization.'
            },
            {
                id: 'renaissance',
                region: 'europe',
                title: 'Italian Renaissance',
                year: 1450,
                position: { x: 44, y: 25 },
                icon: '🎨',
                description: 'The Renaissance began in Italy, marking a cultural rebirth with revolutionary advances in art, science, and humanism.',
                details: 'Artists like Leonardo da Vinci and Michelangelo created masterpieces. The printing press revolutionized the spread of knowledge.',
                keyFigures: ['Leonardo da Vinci', 'Michelangelo', 'Botticelli'],
                culturalSignificance: 'Foundation of modern Western art and humanist philosophy.'
            }
        ]
    },
    
    // Early Modern Era (1500 to 1800)
    earlyModern: {
        era: 'Early Modern Era',
        yearRange: [1500, 1800],
        events: [
            {
                id: 'mughal-empire',
                region: 'asia',
                title: 'Mughal Empire',
                year: 1600,
                position: { x: 62, y: 38 },
                icon: '🕌',
                description: 'The Mughal Empire united most of the Indian subcontinent and created architectural wonders like the Taj Mahal.',
                details: 'Under Akbar the Great, the empire promoted religious tolerance and cultural synthesis. The Taj Mahal took 22 years and 20,000 workers to complete.',
                keyFigures: ['Akbar the Great', 'Shah Jahan', 'Mumtaz Mahal'],
                culturalSignificance: 'Blend of Persian, Indian, and Islamic cultures in architecture and arts.'
            },
            {
                id: 'ottoman-empire',
                region: 'middle-east',
                title: 'Ottoman Empire Peak',
                year: 1550,
                position: { x: 50, y: 30 },
                icon: '🌙',
                description: 'Under Suleiman the Magnificent, the Ottoman Empire reached its peak, controlling much of Southeast Europe, Western Asia, and North Africa.',
                details: 'The empire was known for its military power, administrative efficiency, and cultural achievements including the works of architect Mimar Sinan.',
                keyFigures: ['Suleiman the Magnificent', 'Mimar Sinan'],
                culturalSignificance: 'Bridge between East and West, Islamic cultural flowering.'
            },
            {
                id: 'edo-japan',
                region: 'asia',
                title: 'Edo Period Japan',
                year: 1700,
                position: { x: 82, y: 27 },
                icon: '🏯',
                description: 'The Edo period brought peace and isolation to Japan, fostering unique cultural developments like kabuki theater and ukiyo-e art.',
                details: 'The sakoku (closed country) policy limited foreign contact for over 200 years, allowing Japanese culture to develop in relative isolation.',
                keyFigures: ['Tokugawa Ieyasu', 'Matsuo Bashō'],
                culturalSignificance: 'Development of distinct Japanese cultural forms.'
            },
            {
                id: 'enlightenment',
                region: 'europe',
                title: 'Age of Enlightenment',
                year: 1750,
                position: { x: 40, y: 20 },
                icon: '💡',
                description: 'The Enlightenment emphasized reason, science, and individual rights, laying the foundation for modern democracy.',
                details: 'Philosophers like Voltaire, Locke, and Rousseau challenged traditional authority and promoted ideas of liberty and equality.',
                keyFigures: ['Voltaire', 'John Locke', 'Jean-Jacques Rousseau'],
                culturalSignificance: 'Foundation of modern democratic and scientific thought.'
            },
            {
                id: 'aboriginal-contact',
                region: 'australia',
                title: 'First European Contact',
                year: 1770,
                position: { x: 82, y: 72 },
                icon: '⛵',
                description: 'Captain James Cook claimed the east coast of Australia for Britain, beginning a period of colonization that devastated Indigenous populations.',
                details: 'Aboriginal Australians had inhabited the continent for over 65,000 years before European arrival. Colonization brought disease, dispossession, and cultural destruction.',
                keyFigures: ['Captain James Cook'],
                culturalSignificance: 'Beginning of colonial period and Indigenous displacement.'
            }
        ]
    },
    
    // Modern Era (1800 to 2025)
    modern: {
        era: 'Modern Era',
        yearRange: [1800, 2025],
        events: [
            {
                id: 'industrial-revolution',
                region: 'europe',
                title: 'Industrial Revolution',
                year: 1850,
                position: { x: 38, y: 18 },
                icon: '⚙️',
                description: 'The Industrial Revolution transformed society through mechanization, urbanization, and new manufacturing processes.',
                details: 'Beginning in Britain, industrialization spread across Europe and the world, fundamentally changing how people lived and worked.',
                keyFigures: ['James Watt', 'Richard Arkwright'],
                culturalSignificance: 'Birth of modern industrial society and capitalism.'
            },
            {
                id: 'meiji-restoration',
                region: 'asia',
                title: 'Meiji Restoration',
                year: 1868,
                position: { x: 82, y: 28 },
                icon: '🌸',
                description: 'Japan rapidly modernized after the Meiji Restoration, transforming from a feudal society to an industrial power.',
                details: 'In just a few decades, Japan adopted Western technology, established a constitution, and became a major world power.',
                keyFigures: ['Emperor Meiji', 'Itō Hirobumi'],
                culturalSignificance: 'Model of rapid modernization while preserving cultural identity.'
            },
            {
                id: 'berlin-conference',
                region: 'africa',
                title: 'Scramble for Africa',
                year: 1884,
                position: { x: 46, y: 55 },
                icon: '🗺️',
                description: 'European powers divided Africa at the Berlin Conference, beginning a period of colonial rule that reshaped the continent.',
                details: 'By 1914, European nations controlled 90% of Africa. Colonial borders often ignored ethnic and cultural boundaries, creating lasting conflicts.',
                keyFigures: ['Otto von Bismarck', 'King Leopold II'],
                culturalSignificance: 'Colonial period shaped modern African political boundaries.'
            },
            {
                id: 'indian-independence',
                region: 'asia',
                title: 'Indian Independence',
                year: 1947,
                position: { x: 62, y: 42 },
                icon: '🇮🇳',
                description: 'India gained independence from British rule through a non-violent movement led by Mahatma Gandhi.',
                details: 'The partition of India and Pakistan led to massive population transfers and communal violence, but also demonstrated the power of non-violent resistance.',
                keyFigures: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Muhammad Ali Jinnah'],
                culturalSignificance: 'Model of non-violent resistance and decolonization.'
            },
            {
                id: 'african-independence',
                region: 'africa',
                title: 'African Independence',
                year: 1960,
                position: { x: 40, y: 52 },
                icon: '✊',
                description: '1960 was the "Year of Africa" when 17 countries gained independence from colonial rule.',
                details: 'The independence movements were led by figures like Kwame Nkrumah, who advocated for Pan-Africanism and African unity.',
                keyFigures: ['Kwame Nkrumah', 'Patrice Lumumba', 'Nelson Mandela'],
                culturalSignificance: 'End of colonial era and birth of modern African nations.'
            },
            {
                id: 'eu-formation',
                region: 'europe',
                title: 'European Union',
                year: 1993,
                position: { x: 44, y: 22 },
                icon: '🇪🇺',
                description: 'The European Union was established, creating an economic and political union of European nations.',
                details: 'The EU brought together former enemies in a project of peace and cooperation, with a single market and shared currency for many members.',
                keyFigures: ['Jean Monnet', 'Robert Schuman', 'Helmut Kohl'],
                culturalSignificance: 'Unprecedented experiment in supranational governance.'
            },
            {
                id: 'aboriginal-apology',
                region: 'australia',
                title: 'National Apology',
                year: 2008,
                position: { x: 78, y: 78 },
                icon: '🤝',
                description: 'Australian Prime Minister Kevin Rudd formally apologized to the Stolen Generations of Aboriginal and Torres Strait Islander peoples.',
                details: 'The apology acknowledged the forced removal of Indigenous children from their families and the lasting trauma caused by these policies.',
                keyFigures: ['Kevin Rudd'],
                culturalSignificance: 'Step toward reconciliation with Indigenous Australians.'
            },
            {
                id: 'china-rise',
                region: 'asia',
                title: 'China\'s Economic Rise',
                year: 2010,
                position: { x: 74, y: 30 },
                icon: '📈',
                description: 'China became the world\'s second-largest economy, marking a shift in global economic power.',
                details: 'Since opening up in 1978, China lifted over 800 million people out of poverty and became a major global manufacturing hub.',
                keyFigures: ['Deng Xiaoping', 'Xi Jinping'],
                culturalSignificance: 'Return of China as a major world power.'
            }
        ]
    }
};

// Aboriginal Dreamtime stories and culture
const aboriginalCulture = {
    dreamtime: {
        title: 'The Dreamtime',
        description: 'Aboriginal Dreamtime (or Dreaming) is the foundation of Indigenous Australian culture, describing the creation of the world by ancestral beings.',
        stories: [
            {
                name: 'Rainbow Serpent',
                description: 'The Rainbow Serpent is one of the most important Dreamtime beings, associated with water, life, and fertility.'
            },
            {
                name: 'Songlines',
                description: 'Songlines are paths across the land that mark the routes followed by creator beings, serving as maps and repositories of knowledge.'
            }
        ]
    }
};

// Cultural achievements data for display in modals
const culturalAchievements = {
    asia: [
        { name: 'Chinese Calligraphy', icon: '🖌️', description: 'An ancient art form considered the supreme visual art in East Asia.' },
        { name: 'Japanese Tea Ceremony', icon: '🍵', description: 'A choreographed ritual of preparing and serving matcha green tea.' },
        { name: 'Indian Classical Dance', icon: '💃', description: 'Ancient dance forms like Bharatanatyam and Kathak express spiritual themes.' },
        { name: 'Thai Cuisine', icon: '🍜', description: 'Known for its balance of five fundamental flavors: sweet, sour, salty, bitter, and spicy.' }
    ],
    'middle-east': [
        { name: 'Arabic Calligraphy', icon: '✒️', description: 'Developed as an art form to beautify Quranic texts.' },
        { name: 'Persian Poetry', icon: '📜', description: 'Poets like Rumi and Hafez created works that resonate across cultures.' },
        { name: 'Islamic Architecture', icon: '🕌', description: 'Characterized by geometric patterns, arabesques, and domes.' },
        { name: 'Middle Eastern Music', icon: '🎵', description: 'Features maqam modes and instruments like the oud and qanun.' }
    ],
    europe: [
        { name: 'Renaissance Art', icon: '🎨', description: 'Revolutionized visual arts with perspective and human-centered themes.' },
        { name: 'Classical Music', icon: '🎼', description: 'From Bach to Beethoven, European classical music defined Western musical tradition.' },
        { name: 'Gothic Architecture', icon: '⛪', description: 'Soaring cathedrals with pointed arches and flying buttresses.' },
        { name: 'Literature', icon: '📚', description: 'From Shakespeare to Tolstoy, European literature shaped world storytelling.' }
    ],
    africa: [
        { name: 'African Drumming', icon: '🥁', description: 'Complex polyrhythmic traditions used for communication and ceremony.' },
        { name: 'Masks and Sculpture', icon: '🎭', description: 'Ritual masks and sculptures that influenced modern art movements.' },
        { name: 'Oral Traditions', icon: '🗣️', description: 'Griots preserve history through storytelling and music.' },
        { name: 'Textile Arts', icon: '🧵', description: 'Kente cloth, mud cloth, and other distinctive textile traditions.' }
    ],
    australia: [
        { name: 'Dot Painting', icon: '🎨', description: 'Contemporary Aboriginal art using dots to represent Dreamtime stories.' },
        { name: 'Didgeridoo', icon: '🎶', description: 'Wind instrument developed by Indigenous Australians over 1,500 years ago.' },
        { name: 'Rock Art', icon: '🪨', description: 'Some of the oldest rock art in the world, dating back over 40,000 years.' },
        { name: 'Bush Tucker', icon: '🌿', description: 'Traditional knowledge of native plants and animals for food and medicine.' }
    ]
};

// Trade routes data for visualization
const tradeRoutes = {
    silkRoad: {
        name: 'Silk Road',
        period: [-130, 1450],
        color: '#C9A227',
        description: 'Ancient network of trade routes connecting the East and West',
        path: [
            { x: 78, y: 35, name: "Xi'an (Chang'an)" },
            { x: 72, y: 33, name: 'Dunhuang' },
            { x: 68, y: 35, name: 'Samarkand' },
            { x: 58, y: 35, name: 'Baghdad' },
            { x: 50, y: 32, name: 'Constantinople' },
            { x: 42, y: 30, name: 'Rome' }
        ]
    },
    transaharan: {
        name: 'Trans-Saharan Trade',
        period: [300, 1600],
        color: '#27AE60',
        description: 'Trade routes crossing the Sahara Desert',
        path: [
            { x: 38, y: 48, name: 'Timbuktu' },
            { x: 36, y: 42, name: 'Sijilmasa' },
            { x: 38, y: 38, name: 'Fez' }
        ]
    },
    spiceRoute: {
        name: 'Spice Route',
        period: [100, 1800],
        color: '#E74C3C',
        description: 'Maritime route connecting Asia to Europe via the Indian Ocean',
        path: [
            { x: 85, y: 55, name: 'Malacca' },
            { x: 72, y: 52, name: 'Calicut' },
            { x: 55, y: 45, name: 'Aden' },
            { x: 50, y: 42, name: 'Cairo' },
            { x: 42, y: 30, name: 'Venice' }
        ]
    }
};

// Empires data for timeline visualization
const empires = {
    roman: {
        name: 'Roman Empire',
        period: [-27, 476],
        region: 'europe',
        color: '#8B0000',
        maxExtent: 117
    },
    han: {
        name: 'Han Dynasty',
        period: [-206, 220],
        region: 'asia',
        color: '#FFD700'
    },
    mongol: {
        name: 'Mongol Empire',
        period: [1206, 1368],
        region: 'asia',
        color: '#4169E1'
    },
    ottoman: {
        name: 'Ottoman Empire',
        period: [1299, 1922],
        region: 'middle-east',
        color: '#006400'
    },
    mali: {
        name: 'Mali Empire',
        period: [1235, 1600],
        region: 'africa',
        color: '#FFD700'
    },
    mughal: {
        name: 'Mughal Empire',
        period: [1526, 1857],
        region: 'asia',
        color: '#9932CC'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        regionsData,
        historicalEvents,
        aboriginalCulture,
        culturalAchievements,
        tradeRoutes,
        empires
    };
}
