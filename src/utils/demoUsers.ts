// Demo users for testing different roles
export const demoUsers = [
  {
    email: 'admin@demo.com',
    password: '123456',
    role: 'admin',
    name: 'Admin User'
  },
  {
    email: 'tenant@demo.com', 
    password: '123456',
    role: 'tenant',
    name: 'Tenant User'
  },
  {
    email: 'agent@demo.com',
    password: '123456', 
    role: 'agent',
    name: 'Agent User'
  },
  {
    email: 'facility@demo.com',
    password: '123456',
    role: 'facility_manager', 
    name: 'Facility Manager'
  },
  {
    email: 'landlord@demo.com',
    password: '123456',
    role: 'landlord',
    name: 'Landlord User'
  },
  {
    email: 'subllandlord@demo.com',
    password: '123456',
    role: 'sub_landlord',
    name: 'Sub-Landlord User'
  },
  {
    email: 'security@demo.com',
    password: '123456',
    role: 'security',
    name: 'Security User'
  }
];

export const getDemoUserInstructions = () => `
🎯 Demo Login Instructions:

Use any of these demo accounts to test different user roles:

👤 Admin: admin@demo.com / 123456
🏠 Tenant: tenant@demo.com / 123456  
🏢 Agent: agent@demo.com / 123456
🔧 Facility Manager: facility@demo.com / 123456
🏘️ Landlord: landlord@demo.com / 123456
🏠 Sub-Landlord: subllandlord@demo.com / 123456
🛡️ Security: security@demo.com / 123456

Each role will show different tab navigation and screens!
`;
