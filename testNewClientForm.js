// Test script for New Client Form
console.log('🧪 Testing New Client Form...');

// Test 1: Check if the route is accessible
function testRoute() {
  console.log('=== Test 1: Route Accessibility ===');
  try {
    // Check if we can navigate to the new client form
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);
    
    if (currentPath === '/dashboard/clients/new') {
      console.log('✅ Successfully navigated to new client form');
    } else {
      console.log('❌ Not on new client form page');
      console.log('Navigate to: /dashboard/clients/new');
    }
  } catch (error) {
    console.log('Error testing route:', error);
  }
}

// Test 2: Check form validation
function testFormValidation() {
  console.log('=== Test 2: Form Validation ===');
  try {
    const form = document.querySelector('form');
    if (form) {
      console.log('✅ Form found');
      
      // Check required fields
      const requiredFields = ['name', 'email', 'phone', 'company', 'contactPerson'];
      requiredFields.forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
          console.log(`✅ ${field} field found`);
        } else {
          console.log(`❌ ${field} field missing`);
        }
      });
    } else {
      console.log('❌ Form not found');
    }
  } catch (error) {
    console.log('Error testing form validation:', error);
  }
}

// Test 3: Check form submission
function testFormSubmission() {
  console.log('=== Test 3: Form Submission ===');
  try {
    const submitButton = document.querySelector('button[type="submit"], button:contains("Create Client")');
    if (submitButton) {
      console.log('✅ Submit button found');
      console.log('Button text:', submitButton.textContent);
      console.log('Button disabled:', submitButton.disabled);
    } else {
      console.log('❌ Submit button not found');
    }
  } catch (error) {
    console.log('Error testing form submission:', error);
  }
}

// Test 4: Check form fields
function testFormFields() {
  console.log('=== Test 4: Form Fields ===');
  try {
    const expectedFields = [
      'name', 'email', 'phone', 'company', 'address',
      'status', 'type', 'industry', 'website', 'notes',
      'contactPerson', 'position'
    ];
    
    expectedFields.forEach(field => {
      const input = document.querySelector(`[name="${field}"]`);
      if (input) {
        console.log(`✅ ${field} field found`);
        console.log(`   Type: ${input.type || 'text'}`);
        console.log(`   Required: ${input.required || 'false'}`);
      } else {
        console.log(`❌ ${field} field missing`);
      }
    });
  } catch (error) {
    console.log('Error testing form fields:', error);
  }
}

// Run all tests
testRoute();
testFormValidation();
testFormSubmission();
testFormFields();

console.log('✅ New Client Form tests completed. Check console for results.');

// Helper function to fill form with test data
function fillTestData() {
  console.log('=== Filling Test Data ===');
  try {
    const testData = {
      name: 'Test Client Corp',
      email: 'test@clientcorp.com',
      phone: '+1-555-123-4567',
      company: 'Test Client Corporation',
      address: '123 Test Street, Test City, TC 12345',
      contactPerson: 'John Test',
      position: 'CEO',
      industry: 'Technology',
      website: 'https://testclientcorp.com',
      notes: 'This is a test client for development purposes.'
    };
    
    Object.entries(testData).forEach(([field, value]) => {
      const input = document.querySelector(`[name="${field}"]`);
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`✅ Filled ${field} with: ${value}`);
      } else {
        console.log(`❌ Could not find field: ${field}`);
      }
    });
    
    console.log('✅ Test data filled successfully');
  } catch (error) {
    console.log('Error filling test data:', error);
  }
}

// Expose fillTestData globally
window.fillTestData = fillTestData;
console.log('💡 Run fillTestData() to populate the form with test data'); 