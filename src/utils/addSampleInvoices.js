import { addDoc, serverTimestamp } from 'firebase/firestore';
import { userInvoicesRef } from '../Firebase/firebase';
import { auth } from '../Firebase/firebase';

// Sample invoice data
const sampleInvoices = [
  {
    invoiceNumber: "INV-2024-001",
    clientName: "Tech Solutions Inc.",
    clientEmail: "contact@techsolutions.com",
    clientPhone: "+1-555-0101",
    issueDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-15"),
    status: "Paid",
    subtotal: 2500.00,
    tax: 250.00,
    discount: 0.00,
    total: 2750.00,
    items: [
      {
        name: "Web Development Services",
        description: "Custom website development and deployment",
        quantity: 1,
        rate: 2500.00,
        amount: 2500.00
      }
    ],
    notes: "Payment received on time. Thank you for your business!",
    paymentDate: new Date("2024-01-20"),
    paymentMethod: "Bank Transfer"
  },
  {
    invoiceNumber: "INV-2024-002",
    clientName: "Marketing Pro Agency",
    clientEmail: "info@marketingpro.com",
    clientPhone: "+1-555-0102",
    issueDate: new Date("2024-01-20"),
    dueDate: new Date("2024-02-20"),
    status: "Pending",
    subtotal: 1800.00,
    tax: 180.00,
    discount: 100.00,
    total: 1880.00,
    items: [
      {
        name: "Digital Marketing Campaign",
        description: "Social media marketing and content creation",
        quantity: 1,
        rate: 1800.00,
        amount: 1800.00
      }
    ],
    notes: "Early payment discount applied. Due date approaching.",
    paymentDate: null,
    paymentMethod: null
  },
  {
    invoiceNumber: "INV-2024-003",
    clientName: "Design Studio Creative",
    clientEmail: "hello@designstudio.com",
    clientPhone: "+1-555-0103",
    issueDate: new Date("2024-01-10"),
    dueDate: new Date("2024-02-10"),
    status: "Overdue",
    subtotal: 3200.00,
    tax: 320.00,
    discount: 0.00,
    total: 3520.00,
    items: [
      {
        name: "Logo Design Package",
        description: "Complete brand identity design including logo, business cards, and guidelines",
        quantity: 1,
        rate: 3200.00,
        amount: 3200.00
      }
    ],
    notes: "Payment overdue. Please contact us to arrange payment.",
    paymentDate: null,
    paymentMethod: null
  },
  {
    invoiceNumber: "INV-2024-004",
    clientName: "Startup Ventures LLC",
    clientEmail: "contact@startupventures.com",
    clientPhone: "+1-555-0104",
    issueDate: new Date("2024-01-25"),
    dueDate: new Date("2024-02-25"),
    status: "Paid",
    subtotal: 4500.00,
    tax: 450.00,
    discount: 200.00,
    total: 4750.00,
    items: [
      {
        name: "Mobile App Development",
        description: "iOS and Android app development with backend API",
        quantity: 1,
        rate: 4500.00,
        amount: 4500.00
      }
    ],
    notes: "Excellent project delivery. Client very satisfied with the results.",
    paymentDate: new Date("2024-01-30"),
    paymentMethod: "Credit Card"
  },
  {
    invoiceNumber: "INV-2024-005",
    clientName: "Global Consulting Group",
    clientEmail: "info@globalconsulting.com",
    clientPhone: "+1-555-0105",
    issueDate: new Date("2024-01-30"),
    dueDate: new Date("2024-02-29"),
    status: "Pending",
    subtotal: 6000.00,
    tax: 600.00,
    discount: 0.00,
    total: 6600.00,
    items: [
      {
        name: "Business Strategy Consulting",
        description: "Comprehensive business analysis and strategic planning",
        quantity: 1,
        rate: 6000.00,
        amount: 6000.00
      }
    ],
    notes: "Strategic consulting services for Q1 2024. Payment due by end of February.",
    paymentDate: null,
    paymentMethod: null
  }
];

// Function to add sample invoices
export const addSampleInvoices = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('❌ No authenticated user found. Please log in first.');
      return;
    }

    console.log('🚀 Starting to add sample invoices for user:', user.uid);
    
    for (let i = 0; i < sampleInvoices.length; i++) {
      const invoice = sampleInvoices[i];
      
      // Add metadata
      const invoiceData = {
        ...invoice,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Add to Firestore
      const docRef = await addDoc(userInvoicesRef(user.uid), invoiceData);
      console.log(`✅ Added invoice ${i + 1}: ${invoice.invoiceNumber} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 All sample invoices added successfully!');
    console.log('📊 You can now view them in the Invoices dashboard.');
    
    return true;
  } catch (error) {
    console.error('❌ Error adding invoices:', error);
    return false;
  }
};

// Make it available globally for browser console
if (typeof window !== 'undefined') {
  window.addSampleInvoices = addSampleInvoices;
} 