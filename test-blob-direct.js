/**
 * Direct Blob Persistence Checker
 * Tests blob storage without needing the server to be running
 * Uses Vercel Blob SDK directly
 */

const { put, get, list, del } = require('@vercel/blob');

const TEST_TEXT = 'norm is always right';
const TEST_TIMESTAMP = Date.now();

async function checkBlobPersistence() {
  console.log('='.repeat(60));
  console.log('DIRECT BLOB PERSISTENCE CHECK');
  console.log('='.repeat(60));
  console.log(`Test entry: "${TEST_TEXT}"`);
  console.log(`Timestamp: ${TEST_TIMESTAMP}`);
  console.log('');

  try {
    // Step 1: List existing waitlists
    console.log('Step 1: Checking existing waitlists in blob storage...');
    const { blobs } = await list({ prefix: 'waitlists/' });
    console.log(`  Found ${blobs.length} waitlist(s)`);
    
    if (blobs.length === 0) {
      console.log('');
      console.log('⚠️ No waitlists found. Creating a test entry directly...');
      
      // Create a test waitlist entry
      const testWaitlist = {
        id: `test-${TEST_TIMESTAMP}`,
        slug: `test-persistence-${TEST_TIMESTAMP}`,
        name: 'Test Persistence Waitlist',
        description: 'Created for database persistence testing',
        template: 'saas',
        branding: {
          primaryColor: '#6366f1',
          secondaryColor: '#8b5cf6',
          fontFamily: 'Inter, sans-serif',
        },
        settings: {
          title: 'Join Our Waitlist',
          subtitle: 'Test persistence',
          ctaText: 'Join Waitlist',
          successMessage: "You're on the list!",
          referralMessage: 'Share with friends',
          enableReferrals: true,
          requireVerification: false,
        },
        signups: [{
          id: `signup-${TEST_TIMESTAMP}`,
          email: `norm-${TEST_TIMESTAMP}@example.com`,
          name: TEST_TEXT,
          referralCode: 'NORM001',
          referrals: 0,
          position: 1,
          verified: true,
          createdAt: new Date().toISOString(),
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: `test-user-${TEST_TIMESTAMP}`,
        plan: 'free',
      };

      // Save to blob storage
      const key = `waitlists/${testWaitlist.id}.json`;
      await put(key, JSON.stringify(testWaitlist), {
        access: 'public',
        contentType: 'application/json',
      });
      console.log(`  ✅ Created test waitlist: ${testWaitlist.slug}`);
      
      // Step 2: Verify persistence by reading back
      console.log('');
      console.log('Step 2: Verifying data persistence...');
      
      // Re-fetch from blob
      const { blobs: updatedBlobs } = await list({ prefix: 'waitlists/' });
      const testBlob = updatedBlobs.find(b => b.pathname === key);
      
      if (testBlob) {
        const response = await fetch(testBlob.url);
        if (response.ok) {
          const data = await response.json();
          console.log(`  ✅ Data retrieved successfully from blob`);
          console.log(`  📋 Waitlist name: ${data.name}`);
          console.log(`  📊 Signups count: ${data.signups.length}`);
          
          const signup = data.signups[0];
          if (signup) {
            console.log(`  👤 First signup name: "${signup.name}"`);
            console.log(`  📧 First signup email: ${signup.email}`);
            
            if (signup.name === TEST_TEXT) {
              console.log('');
              console.log('='.repeat(60));
              console.log('✅ PERSISTENCE TEST PASSED');
              console.log('='.repeat(60));
              console.log('   - Data written to Vercel Blob successfully');
              console.log('   - Data persisted and retrievable');
              console.log(`   - Entry "${TEST_TEXT}" stored correctly`);
              console.log('   - Database persistence is WORKING');
              console.log('');
              console.log(`Test waitlist slug: ${testWaitlist.slug}`);
              console.log(`Test signup ID: ${signup.id}`);
              
              // Cleanup
              console.log('');
              console.log('Cleaning up test data...');
              await del(key);
              console.log('✅ Test data cleaned up');
              
              process.exit(0);
            } else {
              console.log(`❌ Data mismatch: expected "${TEST_TEXT}", got "${signup.name}"`);
              process.exit(1);
            }
          }
        }
      }
    } else {
      console.log('');
      console.log('Step 2: Testing with existing waitlist...');
      
      // Test the first waitlist
      const firstBlob = blobs[0];
      const response = await fetch(firstBlob.url);
      
      if (response.ok) {
        const waitlist = await response.json();
        console.log(`  Using waitlist: ${waitlist.name} (${waitlist.slug})`);
        console.log(`  Current signups: ${waitlist.signups?.length || 0}`);
        
        // Add a test signup
        const testSignup = {
          id: `test-${TEST_TIMESTAMP}`,
          email: `persistence-test-${TEST_TIMESTAMP}@example.com`,
          name: TEST_TEXT,
          referralCode: `REF${TEST_TIMESTAMP.toString().slice(-6)}`,
          referrals: 0,
          position: (waitlist.signups?.length || 0) + 1,
          verified: true,
          createdAt: new Date().toISOString(),
        };
        
        // Update waitlist with new signup
        waitlist.signups = waitlist.signups || [];
        waitlist.signups.push(testSignup);
        waitlist.updatedAt = new Date().toISOString();
        
        // Save back to blob
        await put(firstBlob.pathname, JSON.stringify(waitlist), {
          access: 'public',
          contentType: 'application/json',
        });
        
        console.log('  ✅ Added test signup to existing waitlist');
        
        // Verify by reading back
        const verifyResponse = await fetch(firstBlob.url);
        const verifiedData = await verifyResponse.json();
        
        const foundSignup = verifiedData.signups.find(
          (s) => s.name === TEST_TEXT && s.id === testSignup.id
        );
        
        if (foundSignup) {
          console.log('');
          console.log('='.repeat(60));
          console.log('✅ PERSISTENCE TEST PASSED');
          console.log('='.repeat(60));
          console.log('   - Data written to existing waitlist');
          console.log('   - Data verified by reading back from blob');
          console.log(`   - Entry "${TEST_TEXT}" persisted correctly`);
          console.log(`   - Signup ID: ${foundSignup.id}`);
          console.log('   - Database persistence is WORKING');
          
          // Cleanup - remove the test signup
          console.log('');
          console.log('Cleaning up test signup...');
          verifiedData.signups = verifiedData.signups.filter(
            (s) => s.id !== testSignup.id
          );
          await put(firstBlob.pathname, JSON.stringify(verifiedData), {
            access: 'public',
            contentType: 'application/json',
          });
          console.log('✅ Test data cleaned up');
          
          process.exit(0);
        } else {
          console.log('❌ Could not verify persisted data');
          process.exit(1);
        }
      }
    }
  } catch (error) {
    console.log('');
    console.log('='.repeat(60));
    console.log('❌ TEST ERROR');
    console.log('='.repeat(60));
    console.log(`Error: ${error.message}`);
    console.log('');
    console.log('Note: This test requires Vercel Blob environment variables:');
    console.log('  - BLOB_READ_WRITE_TOKEN');
    console.log('  - BLOB_BASE_URL (optional)');
    process.exit(1);
  }
}

checkBlobPersistence().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
