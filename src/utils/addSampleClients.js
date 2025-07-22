import { addDoc, serverTimestamp } from 'firebase/firestore';
import { userClientsRef } from '../Firebase/firebase';
import { auth } from '../Firebase/firebase';

// Sample client data
const sampleClients = [
  {
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    phone: "+1-555-0101",
    company: "Tech Solutions Inc.",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    status: "active",
    type: "corporate",
    industry: "Technology",
    website: "https://techsolutions.com",
    notes: "Premium client with ongoing projects. Excellent payment history.",
    contactPerson: "John Smith",
    position: "CTO",
    createdAt: new Date("2024-01-15")
  },
  {
    name: "Marketing Pro Agency",
    email: "info@marketingpro.com",
    phone: "+1-555-0102",
    company: "Marketing Pro Agency",
    address: "456 Marketing Ave, New York, NY 10001",
    status: "active",
    type: "corporate",
    industry: "Marketing",
    website: "https://marketingpro.com",
    notes: "Regular client with monthly retainer. Good communication.",
    contactPerson: "Sarah Johnson",
    position: "Marketing Director",
    createdAt: new Date("2024-01-20")
  },
  {
    name: "Design Studio Creative",
    email: "hello@designstudio.com",
    phone: "+1-555-0103",
    company: "Design Studio Creative",
    address: "789 Creative Blvd, Los Angeles, CA 90210",
    status: "active",
    type: "corporate",
    industry: "Design",
    website: "https://designstudio.com",
    notes: "Creative agency with unique design requirements. Collaborative partner.",
    contactPerson: "Mike Chen",
    position: "Creative Director",
    createdAt: new Date("2024-01-10")
  },
  {
    name: "Startup Ventures LLC",
    email: "contact@startupventures.com",
    phone: "+1-555-0104",
    company: "Startup Ventures LLC",
    address: "321 Startup Way, Austin, TX 73301",
    status: "active",
    type: "startup",
    industry: "Technology",
    website: "https://startupventures.com",
    notes: "Fast-growing startup. Flexible payment terms. High potential.",
    contactPerson: "Emily Davis",
    position: "CEO",
    createdAt: new Date("2024-01-25")
  },
  {
    name: "Global Consulting Group",
    email: "info@globalconsulting.com",
    phone: "+1-555-0105",
    company: "Global Consulting Group",
    address: "654 Business Center, Chicago, IL 60601",
    status: "active",
    type: "corporate",
    industry: "Consulting",
    website: "https://globalconsulting.com",
    notes: "Large consulting firm with multiple departments. Strategic partnership.",
    contactPerson: "David Wilson",
    position: "Managing Director",
    createdAt: new Date("2024-01-30")
  },
  {
    name: "Local Restaurant Chain",
    email: "manager@localrestaurant.com",
    phone: "+1-555-0106",
    company: "Local Restaurant Chain",
    address: "987 Food Street, Miami, FL 33101",
    status: "inactive",
    type: "small_business",
    industry: "Food & Beverage",
    website: "https://localrestaurant.com",
    notes: "Seasonal business. Inactive during off-season.",
    contactPerson: "Maria Rodriguez",
    position: "General Manager",
    createdAt: new Date("2023-12-15")
  },
  {
    name: "Fitness Center Plus",
    email: "admin@fitnesscenter.com",
    phone: "+1-555-0107",
    company: "Fitness Center Plus",
    address: "147 Health Ave, Denver, CO 80201",
    status: "active",
    type: "small_business",
    industry: "Health & Fitness",
    website: "https://fitnesscenter.com",
    notes: "Growing fitness business. Monthly maintenance contract.",
    contactPerson: "Alex Thompson",
    position: "Owner",
    createdAt: new Date("2024-02-01")
  },
  {
    name: "Educational Institute",
    email: "info@eduinst.com",
    phone: "+1-555-0108",
    company: "Educational Institute",
    address: "258 Learning Lane, Boston, MA 02101",
    status: "active",
    type: "educational",
    industry: "Education",
    website: "https://eduinst.com",
    notes: "Educational institution with technology integration needs.",
    contactPerson: "Dr. Lisa Brown",
    position: "IT Director",
    createdAt: new Date("2024-01-05")
  }
];

// Function to add sample clients
export const addSampleClients = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('❌ No authenticated user found. Please log in first.');
      return;
    }

    console.log('🚀 Starting to add sample clients for user:', user.uid);
    
    for (let i = 0; i < sampleClients.length; i++) {
      const client = sampleClients[i];
      
      // Add metadata
      const clientData = {
        ...client,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Add to Firestore
      const docRef = await addDoc(userClientsRef(user.uid), clientData);
      console.log(`✅ Added client ${i + 1}: ${client.name} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 All sample clients added successfully!');
    console.log('📊 You can now view them in the Clients dashboard.');
    
    return true;
  } catch (error) {
    console.error('❌ Error adding clients:', error);
    return false;
  }
};

// Make it available globally for browser console
if (typeof window !== 'undefined') {
  window.addSampleClients = addSampleClients;
} 