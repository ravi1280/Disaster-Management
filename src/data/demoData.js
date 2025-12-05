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
    // Hospitals
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
        id: 8,
        name: 'Teaching Hospital Karapitiya',
        type: 'hospital',
        district: 'Galle',
        address: 'Karapitiya, Galle',
        phone: '+94 91 223 2560',
        coordinates: [6.0535, 80.2210],
        available24x7: true
    },
    {
        id: 9,
        name: 'Jaffna Teaching Hospital',
        type: 'hospital',
        district: 'Jaffna',
        address: 'Hospital Road, Jaffna',
        phone: '+94 21 222 2261',
        coordinates: [9.6615, 80.0255],
        available24x7: true
    },
    {
        id: 10,
        name: 'Anuradhapura Teaching Hospital',
        type: 'hospital',
        district: 'Anuradhapura',
        address: 'Hospital Junction, Anuradhapura',
        phone: '+94 25 222 2261',
        coordinates: [8.3114, 80.4037],
        available24x7: true
    },
    {
        id: 11,
        name: 'Batticaloa Teaching Hospital',
        type: 'hospital',
        district: 'Batticaloa',
        address: 'New Dutch Bar Road, Batticaloa',
        phone: '+94 65 222 2261',
        coordinates: [7.7310, 81.6747],
        available24x7: true
    },
    {
        id: 12,
        name: 'Ratnapura General Hospital',
        type: 'hospital',
        district: 'Ratnapura',
        address: 'Hospital Road, Ratnapura',
        phone: '+94 45 222 2261',
        coordinates: [6.6828, 80.4014],
        available24x7: true
    },

    // Police Stations
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
        id: 13,
        name: 'Kandy Police Station',
        type: 'police',
        district: 'Kandy',
        address: 'Dalada Veediya, Kandy',
        phone: '+94 81 222 2222',
        coordinates: [7.2906, 80.6337],
        available24x7: true
    },
    {
        id: 14,
        name: 'Galle Police Station',
        type: 'police',
        district: 'Galle',
        address: 'Main Street, Galle Fort',
        phone: '+94 91 222 2222',
        coordinates: [6.0367, 80.2170],
        available24x7: true
    },
    {
        id: 15,
        name: 'Gampaha Police Station',
        type: 'police',
        district: 'Gampaha',
        address: 'Colombo Road, Gampaha',
        phone: '+94 33 222 2222',
        coordinates: [7.0873, 79.9990],
        available24x7: true
    },
    {
        id: 16,
        name: 'Matara Police Station',
        type: 'police',
        district: 'Matara',
        address: 'Anagarika Dharmapala Mawatha, Matara',
        phone: '+94 41 222 2222',
        coordinates: [5.9549, 80.5550],
        available24x7: true
    },

    // Fire Departments
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
        id: 17,
        name: 'Kandy Fire Brigade',
        type: 'fire',
        district: 'Kandy',
        address: 'Peradeniya Road, Kandy',
        phone: '+94 81 222 2233',
        coordinates: [7.2906, 80.6337],
        available24x7: true
    },
    {
        id: 18,
        name: 'Galle Fire Station',
        type: 'fire',
        district: 'Galle',
        address: 'Wakwella Road, Galle',
        phone: '+94 91 222 2233',
        coordinates: [6.0535, 80.2210],
        available24x7: true
    },
    {
        id: 19,
        name: 'Negombo Fire Station',
        type: 'fire',
        district: 'Gampaha',
        address: 'Main Street, Negombo',
        phone: '+94 31 222 2233',
        coordinates: [7.2008, 79.8358],
        available24x7: true
    },

    // Shelters
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
        id: 20,
        name: 'Colombo Municipal Council Community Center',
        type: 'shelter',
        district: 'Colombo',
        address: 'Borella, Colombo 08',
        phone: '+94 11 268 9000',
        coordinates: [6.9147, 79.8794],
        capacity: 300,
        currentOccupancy: 145
    },
    {
        id: 21,
        name: 'Kandy Municipal Council Hall',
        type: 'shelter',
        district: 'Kandy',
        address: 'DS Senanayake Street, Kandy',
        phone: '+94 81 222 3344',
        coordinates: [7.2906, 80.6337],
        capacity: 400,
        currentOccupancy: 0
    },
    {
        id: 22,
        name: 'Galle Community Center',
        type: 'shelter',
        district: 'Galle',
        address: 'Matara Road, Galle',
        phone: '+94 91 222 4455',
        coordinates: [6.0535, 80.2210],
        capacity: 250,
        currentOccupancy: 78
    },
    {
        id: 23,
        name: 'Ratnapura District Secretariat Hall',
        type: 'shelter',
        district: 'Ratnapura',
        address: 'Main Street, Ratnapura',
        phone: '+94 45 222 5566',
        coordinates: [6.6828, 80.4014],
        capacity: 350,
        currentOccupancy: 210
    },

    // Relief Organizations
    {
        id: 7,
        name: 'Red Cross Society - Colombo',
        type: 'relief',
        district: 'Colombo',
        address: '104 Dharmapala Mawatha, Colombo 07',
        phone: '+94 11 269 1095',
        coordinates: [6.9147, 79.8612],
        services: ['Medical Aid', 'Food Distribution', 'Temporary Shelter']
    },
    {
        id: 24,
        name: 'Disaster Management Centre',
        type: 'relief',
        district: 'Colombo',
        address: 'Vidya Mawatha, Colombo 07',
        phone: '+94 11 263 6136',
        coordinates: [6.9147, 79.8612],
        services: ['Coordination', 'Emergency Response', 'Relief Distribution'],
        available24x7: true
    },
    {
        id: 25,
        name: 'Sarvodaya Disaster Management',
        type: 'relief',
        district: 'Colombo',
        address: '98 Rawatawatte Road, Moratuwa',
        phone: '+94 11 265 5000',
        coordinates: [6.7730, 79.8816],
        services: ['Relief Supplies', 'Rehabilitation', 'Community Support']
    },
    {
        id: 26,
        name: 'Red Cross Society - Kandy',
        type: 'relief',
        district: 'Kandy',
        address: 'Peradeniya Road, Kandy',
        phone: '+94 81 222 3456',
        coordinates: [7.2906, 80.6337],
        services: ['Medical Aid', 'Food Distribution', 'Emergency Response']
    },
    {
        id: 27,
        name: 'Red Cross Society - Galle',
        type: 'relief',
        district: 'Galle',
        address: 'Wakwella Road, Galle',
        phone: '+94 91 222 4567',
        coordinates: [6.0535, 80.2210],
        services: ['Medical Aid', 'Relief Distribution', 'Shelter Support']
    },
    {
        id: 28,
        name: 'World Vision Sri Lanka - Colombo',
        type: 'relief',
        district: 'Colombo',
        address: 'Rajagiriya',
        phone: '+94 11 286 8501',
        coordinates: [6.9147, 79.8970],
        services: ['Child Protection', 'Food Security', 'Emergency Relief']
    },
    {
        id: 29,
        name: 'CARE International Sri Lanka',
        type: 'relief',
        district: 'Colombo',
        address: 'Duplication Road, Colombo 04',
        phone: '+94 11 250 3947',
        coordinates: [6.8905, 79.8563],
        services: ['Emergency Response', 'Livelihood Support', 'Water & Sanitation']
    },
    {
        id: 30,
        name: 'Save the Children Sri Lanka',
        type: 'relief',
        district: 'Colombo',
        address: 'Nawala Road, Rajagiriya',
        phone: '+94 11 286 0885',
        coordinates: [6.9147, 79.8970],
    },

    // Ambulance Services
    {
        id: 31,
        name: 'Suwa Seriya - National Ambulance Service',
        type: 'ambulance',
        district: 'Colombo',
        address: 'Nationwide Coverage',
        phone: '1990',
        coordinates: [6.9271, 79.8612],
        available24x7: true,
        services: ['Emergency Transport', 'Pre-hospital Care', 'Trauma Response']
    },
    {
        id: 32,
        name: 'Private Ambulance Service - Colombo',
        type: 'ambulance',
        district: 'Colombo',
        address: 'Borella, Colombo 08',
        phone: '+94 11 269 5555',
        coordinates: [6.9147, 79.8794],
        available24x7: true,
        services: ['Patient Transport', 'ICU Ambulance', 'Emergency Response']
    },
    {
        id: 33,
        name: 'Kandy Ambulance Service',
        type: 'ambulance',
        district: 'Kandy',
        address: 'Peradeniya Road, Kandy',
        phone: '+94 81 222 5555',
        coordinates: [7.2906, 80.6337],
        available24x7: true,
        services: ['Emergency Transport', 'Medical Assistance']
    },

    // Blood Banks
    {
        id: 34,
        name: 'National Blood Transfusion Service',
        type: 'bloodbank',
        district: 'Colombo',
        address: 'Narahenpita, Colombo 05',
        phone: '+94 11 269 1111',
        coordinates: [6.8905, 79.8794],
        available24x7: true,
        services: ['Blood Donation', 'Blood Storage', 'Emergency Supply']
    },
    {
        id: 35,
        name: 'Kandy Blood Bank',
        type: 'bloodbank',
        district: 'Kandy',
        address: 'Kandy General Hospital',
        phone: '+94 81 223 3338',
        coordinates: [7.2906, 80.6337],
        available24x7: true,
        services: ['Blood Donation', 'Emergency Blood Supply']
    },
    {
        id: 36,
        name: 'Galle Blood Bank',
        type: 'bloodbank',
        district: 'Galle',
        address: 'Teaching Hospital Karapitiya',
        phone: '+94 91 223 2561',
        coordinates: [6.0535, 80.2210],
        available24x7: true,
        services: ['Blood Donation', 'Blood Testing', 'Emergency Supply']
    },

    // Pharmacies
    {
        id: 37,
        name: 'Osu Sala - State Pharmaceuticals',
        type: 'pharmacy',
        district: 'Colombo',
        address: 'Rajagiriya',
        phone: '+94 11 286 3456',
        coordinates: [6.9147, 79.8970],
        available24x7: true,
        services: ['Prescription Medicines', 'Emergency Drugs', 'Medical Supplies']
    },
    {
        id: 38,
        name: 'Healthguard Pharmacy',
        type: 'pharmacy',
        district: 'Colombo',
        address: 'Bambalapitiya',
        phone: '+94 11 258 7890',
        coordinates: [6.8905, 79.8563],
        available24x7: true,
        services: ['Medicines', 'Medical Equipment', '24/7 Service']
    },
    {
        id: 39,
        name: 'Link Pharmacy',
        type: 'pharmacy',
        district: 'Kandy',
        address: 'Dalada Veediya, Kandy',
        phone: '+94 81 222 6789',
        coordinates: [7.2906, 80.6337],
        available24x7: false,
        services: ['Prescription Drugs', 'OTC Medicines', 'Medical Supplies']
    },
    {
        id: 40,
        name: 'Galle City Pharmacy',
        type: 'pharmacy',
        district: 'Galle',
        address: 'Main Street, Galle',
        phone: '+94 91 222 7890',
        coordinates: [6.0535, 80.2210],
        available24x7: true,
        services: ['Medicines', 'First Aid Supplies', 'Emergency Drugs']
    },

    // Emergency Supply Distribution Centers
    {
        id: 41,
        name: 'Colombo Emergency Supply Center',
        type: 'supplies',
        district: 'Colombo',
        address: 'Sugathadasa Stadium, Maligawatta',
        phone: '+94 11 269 4400',
        coordinates: [6.9394, 79.8736],
        available24x7: true,
        supplies: {
            waterBottles: 5000,
            foodPackages: 3000,
            medicalSupplies: 2000,
            blankets: 1500,
            tents: 200
        },
        services: ['Water Distribution', 'Food Packages', 'Medical Supplies', 'Blankets', 'Tents']
    },
    {
        id: 42,
        name: 'Kandy Relief Supply Center',
        type: 'supplies',
        district: 'Kandy',
        address: 'Municipal Council Grounds, Kandy',
        phone: '+94 81 222 3300',
        coordinates: [7.2906, 80.6337],
        available24x7: true,
        supplies: {
            waterBottles: 3000,
            foodPackages: 2000,
            medicalSupplies: 1500,
            blankets: 1000,
            tents: 150
        },
        services: ['Water Bottles', 'Food Distribution', 'First Aid Kits', 'Blankets']
    },
    {
        id: 43,
        name: 'Galle Emergency Supplies',
        type: 'supplies',
        district: 'Galle',
        address: 'Galle Municipal Grounds',
        phone: '+94 91 222 4400',
        coordinates: [6.0535, 80.2210],
        available24x7: true,
        supplies: {
            waterBottles: 2500,
            foodPackages: 1800,
            medicalSupplies: 1200,
            blankets: 800,
            tents: 100
        },
        services: ['Water Bottles', 'Food Packages', 'Medical Kits', 'Emergency Supplies']
    },
    {
        id: 44,
        name: 'Ratnapura Supply Distribution',
        type: 'supplies',
        district: 'Ratnapura',
        address: 'District Secretariat, Ratnapura',
        phone: '+94 45 222 5500',
        coordinates: [6.6828, 80.4014],
        available24x7: false,
        supplies: {
            waterBottles: 2000,
            foodPackages: 1500,
            medicalSupplies: 1000,
            blankets: 600,
            tents: 80
        },
        services: ['Water Distribution', 'Food Packages', 'Medical Supplies', 'Shelter Materials']
    },
    {
        id: 45,
        name: 'Gampaha Relief Center',
        type: 'supplies',
        district: 'Gampaha',
        address: 'Gampaha Town Hall',
        phone: '+94 33 222 3300',
        coordinates: [7.0873, 79.9990],
        available24x7: true,
        supplies: {
            waterBottles: 3500,
            foodPackages: 2500,
            medicalSupplies: 1800,
            blankets: 1200,
            tents: 120
        },
        services: ['Water Bottles', 'Food Packages', 'Medical Supplies', 'Hygiene Kits', 'Blankets']
    },
    {
        id: 46,
        name: 'Matara Emergency Supplies',
        type: 'supplies',
        district: 'Matara',
        address: 'Matara Municipal Grounds',
        phone: '+94 41 222 3300',
        coordinates: [5.9549, 80.5550],
        available24x7: true,
        supplies: {
            waterBottles: 2000,
            foodPackages: 1500,
            medicalSupplies: 1000,
            blankets: 700,
            tents: 90
        },
        services: ['Water Distribution', 'Food Packages', 'First Aid Supplies', 'Emergency Kits']
    },
    {
        id: 47,
        name: 'Anuradhapura Supply Center',
        type: 'supplies',
        district: 'Anuradhapura',
        address: 'District Sports Complex',
        phone: '+94 25 222 3300',
        coordinates: [8.3114, 80.4037],
        available24x7: false,
        supplies: {
            waterBottles: 1800,
            foodPackages: 1200,
            medicalSupplies: 800,
            blankets: 500,
            tents: 70
        },
        services: ['Water Bottles', 'Food Distribution', 'Medical Kits', 'Blankets']
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
        description: 'Lost during evacuation from Kolonnawa area',
        location: 'Colombo - Kolonnawa',
        contactNumber: '+94 77 555 6666',
        reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
        id: 2,
        type: 'found',
        category: 'pet',
        item: 'Brown dog (Labrador)',
        description: 'Friendly male dog, wearing blue collar, found near temple',
        location: 'Kelaniya',
        contactNumber: '+94 71 444 5555',
        reportedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
        id: 3,
        type: 'lost',
        category: 'personal',
        item: 'Gold wedding ring',
        name: 'Nimal Perera',
        description: 'Engraved with initials "N.P. & S.P." - lost during flood evacuation',
        location: 'Ratnapura Town',
        contactNumber: '+94 76 123 4567',
        reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
        id: 4,
        type: 'found',
        category: 'documents',
        item: 'Passport',
        description: 'Sri Lankan passport found at evacuation center',
        location: 'Colombo - Sugathadasa Stadium',
        contactNumber: '+94 77 888 9999',
        reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
        id: 5,
        type: 'lost',
        category: 'pet',
        item: 'White cat (Persian)',
        name: 'Sanduni Fernando',
        description: 'Female white Persian cat, blue eyes, answers to "Snowy"',
        location: 'Kandy',
        contactNumber: '+94 71 234 5678',
        reportedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
        id: 6,
        type: 'found',
        category: 'personal',
        item: 'Mobile phone (Samsung)',
        description: 'Black Samsung phone found near Red Cross center',
        location: 'Colombo 07',
        contactNumber: '+94 76 345 6789',
        reportedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
        id: 7,
        type: 'lost',
        category: 'documents',
        item: 'Driving License',
        name: 'Rajitha Bandara',
        description: 'Lost along with wallet during landslide evacuation',
        location: 'Nuwara Eliya - Nanu Oya',
        contactNumber: '+94 75 456 7890',
        reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
        id: 8,
        type: 'found',
        category: 'personal',
        item: 'Child\'s backpack',
        description: 'Blue backpack with cartoon characters, contains school books',
        location: 'Gampaha - Wattala',
        contactNumber: '+94 77 567 8901',
        reportedAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
    },
    {
        id: 9,
        type: 'lost',
        category: 'personal',
        item: 'Medication bag',
        name: 'Dr. Chaminda Silva',
        description: 'Black medical bag containing essential medications and equipment',
        location: 'Colombo - National Hospital area',
        contactNumber: '+94 71 678 9012',
        reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
        id: 10,
        type: 'found',
        category: 'pet',
        item: 'Parrot (Green)',
        description: 'Green parrot, can speak a few words, found in residential area',
        location: 'Dehiwala',
        contactNumber: '+94 76 789 0123',
        reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
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
