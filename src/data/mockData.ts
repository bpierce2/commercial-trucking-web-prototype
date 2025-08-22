import type { Equipment, Branch, User, HomeCardData } from '../types';
import rawData from './rawData.json'

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

const equipment: Equipment[] = rawData['result'].map((raw) => ({
  id: raw.dispatchId,
  equipmentNumber: raw.equipmentNumber,
  description: raw.equipmentDescription,
  category: +raw.equipmentCat,
  class: +raw.equipmentClass,
  branchCode: raw.branchId,
  needByTime: raw.needsByTime,
  hasConditionReport: false,
  imageUrl: `https://images.ur.com/catclass/${raw.equipmentCat}-${raw.equipmentClass}.jpg`,
  meter: 0,
  type: 'pickup'
}))

const half = Math.floor(equipment.length / 2)

export const pickupEquipment: Equipment[] = equipment.slice(0, half)

export const deliveryEquipment: Equipment[] = equipment.slice(half)
  .map(e => ({...e, type: 'delivery', meter: +(Math.random() * (15 - 1) + 1).toFixed(2)}))

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