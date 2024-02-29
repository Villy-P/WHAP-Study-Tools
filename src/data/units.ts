interface Unit {
    name: string;
    desc: string;
}

export const units: Unit[] = JSON.parse(`{
    "units": [
        {
            "name": "The Global Tapestry",
            "desc": "A quiz on how states formed, expanded, and declined in areas of the world during the period c. 1200–c. 1450 and the related political, social, and cultural developments of that time."
        }, {
            "name": "Networks of Exchange",
            "desc": "A quiz on how areas of the world were linked through trade and how these connections affected people, cultures, and environments."
        }, {
            "name": "Land-Based Empires",
            "desc": "A quiz on the empires that held power over large contiguous areas of land in the time period c. 1450-c. 1750."
        }, {
            "name": "Transoceanic Interconnections",
            "desc": "A quiz about advances in ocean exploration, the development of new maritime empires, and the effects of new cross-cultural encounters during the time period c. 1450-c. 1750."
        }, {
            "name": "Revolutions",
            "desc": "A quiz about the period c. 1750–c. 1900, where new political ideas and developments in technology led to large-scale changes in governments, society, and economies."
        }, {
            "name": "Consequences of Industrialization",
            "desc": "A quiz about learning how different states acquired and expanded control over colonies and territories during the period c. 1750-c. 1900."
        }, {
            "name": "Global Conflict",
            "desc": "A quiz about the global conflicts that dominated the 1900's to the present."
        }, {
            "name": "Cold War and Decolonization",
            "desc": "A quiz about colonies’ pursuits of independence and the global power struggle between capitalism and communism during the period c. 1900-present."
        }, {
            "name": "Globalization",
            "desc": "A quiz about the causes and effects of the unprecedented connectivity of the modern world during the period c. 1900-present."
        }
    ]
}`).units;