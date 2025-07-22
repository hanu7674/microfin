// Test script to verify clients data flow
console.log('🧪 Testing Clients Data Flow...');

// Test 1: Check Redux state
function testReduxState() {
  console.log('=== Test 1: Redux State ===');
  try {
    // Access Redux store from React app
    const store = window.__REDUX_DEVTOOLS_EXTENSION__?.connect();
    if (store) {
      store.subscribe((state) => {
        console.log('Redux State:', state);
        console.log('Clients State:', state.clients);
      });
    } else {
      console.log('Redux DevTools not available');
    }
  } catch (error) {
    console.log('Error accessing Redux state:', error);
  }
}

// Test 2: Check Firestore data directly
async function testFirestoreData() {
  console.log('=== Test 2: Firestore Data ===');
  try {
    const { getDocs } = await import('firebase/firestore');
    const { userClientsRef } = await import('./src/Firebase/firebase');
    const { auth } = await import('./src/Firebase/firebase');
    
    const user = auth.currentUser;
    if (!user) {
      console.log('❌ No authenticated user');
      return;
    }
    
    console.log('User ID:', user.uid);
    
    const clientsSnapshot = await getDocs(userClientsRef(user.uid));
    console.log('Firestore clients count:', clientsSnapshot.size);
    
    const clients = clientsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Firestore clients data:', clients);
    
  } catch (error) {
    console.log('Error testing Firestore data:', error);
  }
}

// Test 3: Check useClients hook
function testUseClientsHook() {
  console.log('=== Test 3: useClients Hook ===');
  try {
    // This would need to be run from within a React component
    console.log('Hook test would need to be run from React component');
  } catch (error) {
    console.log('Error testing hook:', error);
  }
}

// Run all tests
testReduxState();
testFirestoreData();
testUseClientsHook();

console.log('✅ Tests completed. Check console for results.'); 