import type { Equipment, Branch, User, HomeCardData } from '../types';

// Branch data
export const branches: Branch[] = [
  { code: 'A01', name: 'Atlanta Central', location: 'Atlanta, GA' },
  { code: 'D23', name: 'Dallas North', location: 'Dallas, TX' },
  { code: 'P45', name: 'Portland West', location: 'Portland, OR' },
  { code: 'S67', name: 'Seattle Harbor', location: 'Seattle, WA' }
];

// User data
export const users: User[] = [
  { id: 'user-001', username: 'driver001', branchCode: 'A01' },
  { id: 'user-002', username: 'driver002', branchCode: 'D23' },
  { id: 'user-003', username: 'driver003', branchCode: 'P45' },
  { id: 'user-004', username: 'driver004', branchCode: 'S67' }
];

// Equipment data - Pickups (10 items with varying categories)
export const pickupEquipment: Equipment[] = [
  {
    id: 'pickup-001',
    equipmentNumber: 'TRK-2001',
    description: 'Peterbilt 579 Semi-Truck',
    category: 2100, // Large truck - 20 photos
    type: 'pickup',
    branchCode: 'A01',
    needByTime: '2:30 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    hasConditionReport: false
  },
  {
    id: 'pickup-002', 
    equipmentNumber: 'GEN-045',
    description: 'Honda EU2200i Generator',
    category: 250, // Small equipment - 2 photos
    type: 'pickup',
    branchCode: 'D23',
    needByTime: '11:00 AM Today',
    imageUrl: 'https://picsum.photos/300/200?random=2',
    hasConditionReport: false
  },
  {
    id: 'pickup-003',
    equipmentNumber: 'TRL-1450',
    description: '53ft Dry Van Trailer',
    category: 1450, // Medium equipment - 5 photos
    type: 'pickup',
    branchCode: 'P45',
    needByTime: '9:15 AM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=3',
    hasConditionReport: false
  },
  {
    id: 'pickup-004',
    equipmentNumber: 'CMP-890',
    description: 'Atlas Copco Air Compressor',
    category: 890, // Small equipment - 2 photos
    type: 'pickup',
    branchCode: 'S67',
    needByTime: '4:00 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=4',
    hasConditionReport: false
  },
  {
    id: 'pickup-005',
    equipmentNumber: 'TRK-2250',
    description: 'Kenworth T680 Semi-Truck',
    category: 2250, // Large truck - 20 photos
    type: 'pickup',
    branchCode: 'A01',
    needByTime: '6:45 AM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=5',
    hasConditionReport: false
  },
  {
    id: 'pickup-006',
    equipmentNumber: 'TRL-1200',
    description: 'Flatbed Trailer 48ft',
    category: 1200, // Medium equipment - 5 photos
    type: 'pickup',
    branchCode: 'D23',
    needByTime: '1:30 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=6',
    hasConditionReport: false
  },
  {
    id: 'pickup-007',
    equipmentNumber: 'FLT-340',
    description: 'JLG Scissor Lift',
    category: 340, // Small equipment - 2 photos
    type: 'pickup',
    branchCode: 'P45',
    needByTime: '10:00 AM Today',
    imageUrl: 'https://picsum.photos/300/200?random=7',
    hasConditionReport: false
  },
  {
    id: 'pickup-008',
    equipmentNumber: 'TRK-2180',
    description: 'Freightliner Cascadia',
    category: 2180, // Large truck - 20 photos
    type: 'pickup',
    branchCode: 'S67',
    needByTime: '8:30 AM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=8',
    hasConditionReport: false
  },
  {
    id: 'pickup-009',
    equipmentNumber: 'TRL-1650',
    description: 'Refrigerated Trailer',
    category: 1650, // Medium equipment - 5 photos
    type: 'pickup',
    branchCode: 'A01',
    needByTime: '3:15 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=9',
    hasConditionReport: false
  },
  {
    id: 'pickup-010',
    equipmentNumber: 'WLD-520',
    description: 'Lincoln Welding Machine',
    category: 520, // Small equipment - 2 photos
    type: 'pickup',
    branchCode: 'D23',
    needByTime: '12:45 PM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=10',
    hasConditionReport: false
  }
];

// Equipment data - Deliveries (10 items with varying categories)
export const deliveryEquipment: Equipment[] = [
  {
    id: 'delivery-001',
    equipmentNumber: 'TRK-2340',
    description: 'Volvo VNL 860 Semi-Truck',
    category: 2340, // Large truck - 20 photos
    type: 'delivery',
    branchCode: 'P45',
    needByTime: '7:00 AM Today',
    imageUrl: 'https://picsum.photos/300/200?random=11',
    hasConditionReport: false
  },
  {
    id: 'delivery-002',
    equipmentNumber: 'PWR-180',
    description: 'Caterpillar Power Unit',
    category: 180, // Small equipment - 2 photos
    type: 'delivery',
    branchCode: 'S67',
    needByTime: '5:30 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=12',
    hasConditionReport: false
  },
  {
    id: 'delivery-003',
    equipmentNumber: 'TRL-1380',
    description: 'Lowboy Heavy Haul Trailer',
    category: 1380, // Medium equipment - 5 photos
    type: 'delivery',
    branchCode: 'A01',
    needByTime: '2:00 PM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=13',
    hasConditionReport: false
  },
  {
    id: 'delivery-004',
    equipmentNumber: 'EXC-750',
    description: 'Cat 320 Excavator',
    category: 750, // Small equipment - 2 photos
    type: 'delivery',
    branchCode: 'D23',
    needByTime: '11:30 AM Today',
    imageUrl: 'https://picsum.photos/300/200?random=14',
    hasConditionReport: false
  },
  {
    id: 'delivery-005',
    equipmentNumber: 'TRK-2450',
    description: 'Mack Anthem Semi-Truck',
    category: 2450, // Large truck - 20 photos
    type: 'delivery',
    branchCode: 'P45',
    needByTime: '9:45 AM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=15',
    hasConditionReport: false
  },
  {
    id: 'delivery-006',
    equipmentNumber: 'TRL-1100',
    description: 'Step Deck Trailer',
    category: 1100, // Medium equipment - 5 photos
    type: 'delivery',
    branchCode: 'S67',
    needByTime: '4:15 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=16',
    hasConditionReport: false
  },
  {
    id: 'delivery-007',
    equipmentNumber: 'GEN-380',
    description: 'Generac Industrial Generator',
    category: 380, // Small equipment - 2 photos
    type: 'delivery',
    branchCode: 'A01',
    needByTime: '1:00 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=17',
    hasConditionReport: false
  },
  {
    id: 'delivery-008',
    equipmentNumber: 'TRK-2290',
    description: 'Western Star 4900SB',
    category: 2290, // Large truck - 20 photos
    type: 'delivery',
    branchCode: 'D23',
    needByTime: '6:30 AM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=18',
    hasConditionReport: false
  },
  {
    id: 'delivery-009',
    equipmentNumber: 'TRL-1750',
    description: 'Tanker Trailer',
    category: 1750, // Medium equipment - 5 photos
    type: 'delivery',
    branchCode: 'P45',
    needByTime: '12:15 PM Today',
    imageUrl: 'https://picsum.photos/300/200?random=19',
    hasConditionReport: false
  },
  {
    id: 'delivery-010',
    equipmentNumber: 'SKD-460',
    description: 'Bobcat Skid Steer',
    category: 460, // Small equipment - 2 photos
    type: 'delivery',
    branchCode: 'S67',
    needByTime: '3:30 PM Tomorrow',
    imageUrl: 'https://picsum.photos/300/200?random=20',
    hasConditionReport: false
  }
];

// Combined equipment array
export const allEquipment: Equipment[] = [...pickupEquipment, ...deliveryEquipment];

// Home card data
export const homeCards: HomeCardData[] = [
  {
    id: 'deliveries',
    icon: 'Truck',
    count: deliveryEquipment.filter(eq => !eq.hasConditionReport).length,
    title: 'Equipment deliveries',
    description: 'Complete condition report for equipment/commercial truck deliveries',
    navigationPath: '/app/equipments?type=deliveries'
  },
  {
    id: 'pickups',
    icon: 'Package',
    count: pickupEquipment.filter(eq => !eq.hasConditionReport).length,
    title: 'Equipment pickups',
    description: 'Complete condition reports for equipment/commercial truck pickups',
    navigationPath: '/app/equipments?type=pickups'
  },
  {
    id: 'status',
    icon: 'Search',
    count: allEquipment.filter(eq => !eq.hasConditionReport).length,
    title: 'Equipment status',
    description: 'Search for equipment status via scanning or equipment number',
    navigationPath: '/app/search'
  }
];