import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { config } from './src/Firebase/config';

// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app);

// Team members data


// Run the script
addTeamMembersToFirebase(); 