// Sri Lankan Districts
export const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle'
];

// Demo Disaster Alerts
export const demoAlerts = [
    {
        id: 1,
        title: 'Severe Flood Warning - Colombo District',
        description: 'Heavy rainfall expected. Low-lying areas at risk of flooding. Evacuate to higher ground immediately.',
        severity: 'emergency',
        district: 'Colombo',
        type: 'Flood',
        issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        affectedAreas: ['Kolonnawa', 'Kaduwela', 'Kelaniya']
    },
    {
        id: 2,
        title: 'Landslide Risk - Nuwara Eliya',
        description: 'Soil saturation levels critical. Residents in hilly areas advised to relocate.',
        severity: 'warning',
        district: 'Nuwara Eliya',
        type: 'Landslide',
        issuedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        affectedAreas: ['Nanu Oya', 'Walapane', 'Hanguranketha']
    },
    {
        id: 3,
        title: 'Cyclone Alert - Northern Province',
        description: 'Tropical cyclone approaching. Strong winds and heavy rain expected.',
        severity: 'emergency',
        district: 'Jaffna',
        type: 'Cyclone',
        issuedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        affectedAreas: ['Jaffna', 'Point Pedro', 'Chavakachcheri']
    },
    {
        id: 4,
        title: 'Drought Advisory - Anuradhapura',
        description: 'Water scarcity expected. Conserve water and prepare for rationing.',
        severity: 'info',
        district: 'Anuradhapura',
        type: 'Drought',
        issuedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        affectedAreas: ['Medawachchiya', 'Horowpothana', 'Thirappane']
    },
    {
        id: 5,
        title: 'Flash Flood Warning - Ratnapura',
        description: 'River levels rising rapidly. Immediate evacuation recommended.',
        severity: 'emergency',
        district: 'Ratnapura',
        type: 'Flood',
        issuedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        affectedAreas: ['Ratnapura Town', 'Eheliyagoda', 'Kuruwita']
    }
];

// Demo Safety Check-ins
export const demoSafetyCheckins = [
    { id: 1, name: 'Kasun Perera', relation: 'Family', status: 'safe', location: 'Colombo', lastUpdate: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: 2, name: 'Nimali Silva', relation: 'Friend', status: 'safe', location: 'Kandy', lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 3, name: 'Rajitha Fernando', relation: 'Family', status: 'unknown', location: 'Galle', lastUpdate: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 4, name: 'Amara Jayasinghe', relation: 'Friend', status: 'safe', location: 'Jaffna', lastUpdate: new Date(Date.now() - 30 * 60 * 1000) }
];

// Demo Help Requests
export const demoHelpRequests = [
    {
        id: 1,
        type: 'food',
        priority: 'urgent',
        location: 'Kolonnawa, Colombo',
        coordinates: [6.9333, 79.8833],
        description: 'Family of 5 trapped in flooded area. Need food and water urgently.',
        contactNumber: '+94 77 123 4567',
        status: 'pending',
        requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        requestedBy: 'Sunil Wickramasinghe'
    },
    {
        id: 2,
        type: 'medicine',
        priority: 'urgent',
        location: 'Nanu Oya, Nuwara Eliya',
        coordinates: [6.9497, 80.7891],
        description: 'Elderly patient needs diabetes medication. Road blocked due to landslide.',
        contactNumber: '+94 71 234 5678',
        status: 'inProgress',
        requestedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        requestedBy: 'Dr. Chaminda Rathnayake'
    },
    {
        id: 3,
        type: 'rescue',
        priority: 'urgent',
        location: 'Kelaniya, Gampaha',
        coordinates: [6.9553, 79.9220],
        description: 'People stranded on rooftop. Water level rising.',
        contactNumber: '+94 76 345 6789',
        status: 'pending',
        requestedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        requestedBy: 'Nimal Perera'
    },
    {
        id: 4,
        type: 'shelter',
        priority: 'moderate',
        location: 'Ratnapura Town',
        coordinates: [6.6828, 80.4014],
        description: 'House damaged by flood. Need temporary shelter for family of 8.',
        contactNumber: '+94 75 456 7890',
        status: 'completed',
        requestedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        requestedBy: 'Lakshmi Gunasekara'
    }
];

// Demo Emergency Resources
export const demoResources = [
    {
        id: 1,
        name: 'National Hospital of Sri Lanka',
        type: 'hospital',
        district: 'Colombo',
        address: 'Regent Street, Colombo 07',
        phone: '+94 11 269 1111',
        coordinates: [6.9271, 79.8612],
        available24x7: true
    },
    {
        id: 2,
        name: 'Colombo South Teaching Hospital',
        type: 'hospital',
        district: 'Colombo',
        address: 'Kalubowila, Dehiwala',
        phone: '+94 11 258 6294',
        coordinates: [6.8461, 79.8816],
        available24x7: true
    },
    {
        id: 3,
        name: 'Colombo Fire Station',
        type: 'fire',
        district: 'Colombo',
        address: 'Maradana, Colombo 10',
        phone: '110',
        coordinates: [6.9297, 79.8656],
        available24x7: true
    },
    {
        id: 4,
        name: 'Colombo Police Division',
        type: 'police',
        district: 'Colombo',
        address: 'Fort, Colombo 01',
        phone: '119',
        coordinates: [6.9344, 79.8428],
        available24x7: true
    },
    {
        id: 5,
        name: 'Sugathadasa Indoor Stadium Shelter',
        type: 'shelter',
        district: 'Colombo',
        address: 'Maligawatta, Colombo 10',
        phone: '+94 11 269 4455',
        coordinates: [6.9394, 79.8736],
        capacity: 500,
        currentOccupancy: 234
    },
    {
        id: 6,
        name: 'Kandy General Hospital',
        type: 'hospital',
        district: 'Kandy',
        address: 'William Gopallawa Mawatha, Kandy',
        phone: '+94 81 223 3337',
        coordinates: [7.2906, 80.6337],
        available24x7: true
    },
    {
        id: 7,
        name: 'Red Cross Society - Colombo',
        type: 'relief',
        district: 'Colombo',
        address: '104 Dharmapala Mawatha, Colombo 07',
        phone: '+94 11 269 1095',
        coordinates: [6.9147, 79.8612],
        services: ['Medical Aid', 'Food Distribution', 'Temporary Shelter']
    }
];

// Demo Volunteers
export const demoVolunteers = [
    {
        id: 1,
        name: 'Pradeep Kumara',
        skills: ['First Aid', 'Rescue Operations'],
        district: 'Colombo',
        phone: '+94 77 111 2222',
        available: true,
        tasksCompleted: 12
    },
    {
        id: 2,
        name: 'Sanduni Wijesinghe',
        skills: ['Medical Support', 'Counseling'],
        district: 'Gampaha',
        phone: '+94 71 222 3333',
        available: true,
        tasksCompleted: 8
    },
    {
        id: 3,
        name: 'Rohan De Silva',
        skills: ['Food Distribution', 'Logistics'],
        district: 'Colombo',
        phone: '+94 76 333 4444',
        available: false,
        tasksCompleted: 15
    }
];

// Demo Incident Reports
export const demoReports = [
    {
        id: 1,
        type: 'flooding',
        location: 'Baseline Road, Colombo',
        coordinates: [6.9271, 79.8612],
        description: 'Road completely submerged. Water level approximately 3 feet.',
        severity: 'high',
        reportedBy: 'Anonymous',
        reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        verified: true,
        votes: 15,
        photos: []
    },
    {
        id: 2,
        type: 'roadBlock',
        location: 'Kandy-Nuwara Eliya Road',
        coordinates: [7.0, 80.5],
        description: 'Landslide blocking main road. No alternative route available.',
        severity: 'high',
        reportedBy: 'Kamal Bandara',
        reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        verified: true,
        votes: 23,
        photos: []
    },
    {
        id: 3,
        type: 'damage',
        location: 'Galle Fort Area',
        coordinates: [6.0367, 80.2170],
        description: 'Several buildings damaged due to strong winds.',
        severity: 'moderate',
        reportedBy: 'Malini Perera',
        reportedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        verified: false,
        votes: 8,
        photos: []
    }
];

// Demo Map Markers
export const demoMapMarkers = {
    dangerZones: [
        { id: 1, coordinates: [6.9333, 79.8833], name: 'Kolonnawa Flood Zone', type: 'flood' },
        { id: 2, coordinates: [6.9497, 80.7891], name: 'Nanu Oya Landslide Risk', type: 'landslide' },
        { id: 3, coordinates: [6.6828, 80.4014], name: 'Ratnapura Flood Zone', type: 'flood' }
    ],
    safeZones: [
        { id: 1, coordinates: [6.9394, 79.8736], name: 'Sugathadasa Stadium', capacity: 500 },
        { id: 2, coordinates: [6.9271, 79.8612], name: 'National Hospital Safe Area', capacity: 200 }
    ],
    evacuationCenters: [
        {
            id: 1,
            coordinates: [6.9394, 79.8736],
            name: 'Sugathadasa Indoor Stadium',
            capacity: 500,
            currentOccupancy: 234,
            facilities: ['Food', 'Water', 'Medical', 'Sanitation']
        },
        {
            id: 2,
            coordinates: [6.9147, 79.8612],
            name: 'Red Cross Center',
            capacity: 300,
            currentOccupancy: 145,
            facilities: ['Food', 'Water', 'Medical']
        }
    ]
};

// Demo Weather Data
export const demoWeatherData = {
    current: {
        temperature: 28,
        humidity: 85,
        rainfall: 45,
        windSpeed: 35,
        windDirection: 'SW',
        condition: 'Heavy Rain'
    },
    forecast: [
        { day: 'Today', rainfall: 45, temperature: 28, condition: 'Heavy Rain' },
        { day: 'Tomorrow', rainfall: 60, temperature: 27, condition: 'Very Heavy Rain' },
        { day: 'Day 3', rainfall: 35, temperature: 29, condition: 'Moderate Rain' },
        { day: 'Day 4', rainfall: 20, temperature: 30, condition: 'Light Rain' },
        { day: 'Day 5', rainfall: 10, temperature: 31, condition: 'Partly Cloudy' }
    ]
};

// Demo Utility Status
export const demoUtilityStatus = [
    { district: 'Colombo', service: 'Electricity', status: 'partial', affectedAreas: ['Kolonnawa', 'Kaduwela'], eta: '6 hours' },
    { district: 'Gampaha', service: 'Water Supply', status: 'down', affectedAreas: ['Kelaniya', 'Wattala'], eta: '12 hours' },
    { district: 'Colombo', service: 'Internet', status: 'operational', affectedAreas: [], eta: null },
    { district: 'Ratnapura', service: 'Electricity', status: 'down', affectedAreas: ['Ratnapura Town', 'Eheliyagoda'], eta: '24 hours' }
];

// Demo Dashboard Stats
export const demoDashboardStats = {
    peopleSafe: 12847,
    activeAlerts: 5,
    helpRequests: 234,
    activeVolunteers: 156,
    evacuationCenters: 45,
    peopleEvacuated: 3421
};

// Demo Missing Persons
export const demoMissingPersons = [
    {
        id: 1,
        name: 'Saman Kumara',
        age: 45,
        gender: 'Male',
        lastSeen: 'Kolonnawa, Colombo',
        lastSeenDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        description: 'Wearing blue shirt, black trousers. Medium build, short black hair.',
        contactPerson: 'Nimal Kumara',
        contactNumber: '+94 77 888 9999',
        reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
        id: 2,
        name: 'Kumari Perera',
        age: 32,
        gender: 'Female',
        lastSeen: 'Nanu Oya, Nuwara Eliya',
        lastSeenDate: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        description: 'Wearing red saree. Long black hair, slim build.',
        contactPerson: 'Sunil Perera',
        contactNumber: '+94 71 777 8888',
        reportedAt: new Date(Date.now() - 15 * 60 * 60 * 1000)
    }
];

// Demo Donations
export const demoDonations = [
    {
        id: 1,
        need: 'Food Supplies for 500 families',
        district: 'Colombo',
        urgency: 'urgent',
        required: 500000,
        collected: 325000,
        verified: true
    },
    {
        id: 2,
        need: 'Medical Supplies - Antibiotics & First Aid',
        district: 'Ratnapura',
        urgency: 'urgent',
        required: 200000,
        collected: 180000,
        verified: true
    },
    {
        id: 3,
        need: 'Temporary Shelter Materials',
        district: 'Nuwara Eliya',
        urgency: 'moderate',
        required: 750000,
        collected: 420000,
        verified: true
    }
];

// Demo Lost & Found Items
export const demoLostFound = [
    {
        id: 1,
        type: 'lost',
        category: 'documents',
        item: 'National ID Card',
        name: 'Kamal Silva',
        location: 'Colombo',
        contactNumber: '+94 77 555 6666',
        reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
        id: 2,
        type: 'found',
        category: 'pet',
        item: 'Brown dog (Labrador)',
        location: 'Kelaniya',
        contactNumber: '+94 71 444 5555',
        reportedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
];

// Demo Community Forum Posts
export const demoForumPosts = [
    {
        id: 1,
        title: 'Organizing food distribution in Kolonnawa',
        author: 'Pradeep K.',
        district: 'Colombo',
        content: 'We are organizing food distribution tomorrow at 10 AM. Volunteers needed.',
        replies: 12,
        postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
        id: 2,
        title: 'Alternative route to Nuwara Eliya',
        author: 'Rohan D.',
        district: 'Kandy',
        content: 'Main road blocked. Use Gampola-Nuwara Eliya route instead.',
        replies: 8,
        postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
        id: 3,
        title: 'Medical camp at Ratnapura',
        author: 'Dr. Chaminda',
        district: 'Ratnapura',
        content: 'Free medical camp today 2-6 PM at Town Hall. Bring your prescriptions.',
        replies: 5,
        postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
];
