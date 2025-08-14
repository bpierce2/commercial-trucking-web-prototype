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
    equipmentNumber: 'AB404501',
    description: 'SCISSOR LIFT 39-40\' ELECTRIC 45-48"WIDE',
    category: 300, // Small equipment - 2 photos
    class: '4047',
    type: 'pickup',
    branchCode: 'A01',
    needByTime: '2:30 PM Today',
    imageUrl: 'https://images.ur.com/catclass/300-4047.jpg',
    hasConditionReport: false,
    meter: 263
  },
  {
    id: 'pickup-002', 
    equipmentNumber: '11772820',
    description: 'GENERATOR 2.0-2.4 KW',
    category: 240, // Small equipment - 2 photos
    class: '2981',
    type: 'pickup',
    branchCode: 'D23',
    needByTime: '11:00 AM Today',
    imageUrl: 'https://images.ur.com/catclass/240-2981.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'pickup-003',
    equipmentNumber: '11437191',
    description: 'ROLLER 1.5 TON DOUBLE DRUM SMOOTH GAS',
    category: 160, // Small equipment - 2 photos
    class: '2621',
    type: 'pickup',
    branchCode: 'P45',
    needByTime: '9:15 AM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/160-2621.jpg',
    hasConditionReport: false,
    meter: 258
  },
  {
    id: 'pickup-004',
    equipmentNumber: '11948360',
    description: 'BOOM 30-33\' ARTICULATING DC',
    category: 310, // Small equipment - 2 photos
    class: '3050',
    type: 'pickup',
    branchCode: 'S67',
    needByTime: '4:00 PM Today',
    imageUrl: 'https://images.ur.com/catclass/310-3050.jpg',
    hasConditionReport: false,
    meter: 34
  },
  {
    id: 'pickup-005',
    equipmentNumber: '11101869',
    description: 'SCISSOR LIFT 39-40\' ELECTRIC 45-48"WIDE',
    category: 300, // Small equipment - 2 photos
    class: '4047',
    type: 'pickup',
    branchCode: 'A01',
    needByTime: '6:45 AM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/300-4047.jpg',
    hasConditionReport: false,
    meter: 295024
  },
  {
    id: 'pickup-006',
    equipmentNumber: '11181493',
    description: 'LIGHT TOWER ELECTRIC PUSHAROUND',
    category: 320, // Small equipment - 2 photos
    class: '4060',
    type: 'pickup',
    branchCode: 'D23',
    needByTime: '1:30 PM Today',
    imageUrl: 'https://images.ur.com/catclass/320-4060.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'pickup-007',
    equipmentNumber: '12040063',
    description: 'BOOM VERTICAL MAST 26-27\' SELF PROPELLED',
    category: 310, // Small equipment - 2 photos
    class: '1526',
    type: 'pickup',
    branchCode: 'P45',
    needByTime: '10:00 AM Today',
    imageUrl: 'https://images.ur.com/catclass/310-1526.jpg',
    hasConditionReport: false,
    meter: 3
  },
  {
    id: 'pickup-008',
    equipmentNumber: '11518051',
    description: 'PLANER CONCRETE 8" 9HP GAS',
    category: 220, // Small equipment - 2 photos
    class: '5425',
    type: 'pickup',
    branchCode: 'S67',
    needByTime: '8:30 AM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/220-5425.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'pickup-009',
    equipmentNumber: '11595113',
    description: 'FINISHER CONCRETE 36"',
    category: 180, // Small equipment - 2 photos
    class: '9536',
    type: 'pickup',
    branchCode: 'A01',
    needByTime: '3:15 PM Today',
    imageUrl: 'https://images.ur.com/catclass/180-9536.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'pickup-010',
    equipmentNumber: '1100001',
    description: 'HOSE WHIP WITH OILER',
    category: 110, // Small equipment - 2 photos
    class: '1',
    type: 'pickup',
    branchCode: 'D23',
    needByTime: '12:45 PM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/110-0001.jpg',
    hasConditionReport: false,
    meter: 0
  }
];

// Equipment data - Deliveries (10 items with varying categories)
export const deliveryEquipment: Equipment[] = [
  {
    id: 'delivery-001',
    equipmentNumber: '1102400',
    description: 'AIR HOSE 3/4" X 50\'',
    category: 110, // Small equipment - 2 photos
    class: '2400',
    type: 'delivery',
    branchCode: 'P45',
    needByTime: '7:00 AM Today',
    imageUrl: 'https://images.ur.com/catclass/110-2400.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-002',
    equipmentNumber: '1103625',
    description: 'WHIP CHECK',
    category: 110, // Small equipment - 2 photos
    class: '3625',
    type: 'delivery',
    branchCode: 'S67',
    needByTime: '5:30 PM Today',
    imageUrl: 'https://images.ur.com/catclass/110-3625.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-003',
    equipmentNumber: '1104630',
    description: 'MOIL POINT 12" RIVET BUSTER',
    category: 110, // Small equipment - 2 photos
    class: '4630',
    type: 'delivery',
    branchCode: 'A01',
    needByTime: '2:00 PM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/110-4630.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-004',
    equipmentNumber: '2305151',
    description: 'FORK EXTENSIONS 6\'',
    category: 230, // Small equipment - 2 photos
    class: '5151',
    type: 'delivery',
    branchCode: 'D23',
    needByTime: '11:30 AM Today',
    imageUrl: 'https://images.ur.com/catclass/230-5151.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-005',
    equipmentNumber: '2500120',
    description: 'PROPANE TANK 33# VAPOR',
    category: 250, // Small equipment - 2 photos
    class: '120',
    type: 'delivery',
    branchCode: 'P45',
    needByTime: '9:45 AM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/250-0120.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-006',
    equipmentNumber: '3503250',
    description: 'PRESSURE WASHER HOSE 50\' EXTENSION',
    category: 350, // Small equipment - 2 photos
    class: '3250',
    type: 'delivery',
    branchCode: 'S67',
    needByTime: '4:15 PM Today',
    imageUrl: 'https://images.ur.com/catclass/350-3250.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-007',
    equipmentNumber: '5346680',
    description: 'HOSE 2X50 LAYFLAT DISCHARGE - NPT',
    category: 534, // Small equipment - 2 photos
    class: '6680',
    type: 'delivery',
    branchCode: 'A01',
    needByTime: '1:00 PM Today',
    imageUrl: 'https://images.ur.com/catclass/534-6680.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-008',
    equipmentNumber: '5352020',
    description: 'HOSE 3X20 PVC SUCTION - CAMLOCK',
    category: 535, // Small equipment - 2 photos
    class: '2020',
    type: 'delivery',
    branchCode: 'D23',
    needByTime: '6:30 AM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/535-2020.jpg',
    hasConditionReport: false,
    meter: 0
  },
  {
    id: 'delivery-009',
    equipmentNumber: 'AB101234',
    description: 'BOOM 30-33\' ARTICULATING DC',
    category: 310, // Small equipment - 2 photos
    class: '3050',
    type: 'delivery',
    branchCode: 'P45',
    needByTime: '12:15 PM Today',
    imageUrl: 'https://images.ur.com/catclass/310-3050.jpg',
    hasConditionReport: false,
    meter: 125
  },
  {
    id: 'delivery-010',
    equipmentNumber: 'GN502678',
    description: 'GENERATOR 2.0-2.4 KW',
    category: 240, // Small equipment - 2 photos
    class: '2981',
    type: 'delivery',
    branchCode: 'S67',
    needByTime: '3:30 PM Tomorrow',
    imageUrl: 'https://images.ur.com/catclass/240-2981.jpg',
    hasConditionReport: false,
    meter: 45
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