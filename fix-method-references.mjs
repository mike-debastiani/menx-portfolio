/**
 * Script to fix impression references from draft methods to published methods
 * Run with: node fix-method-references.mjs
 * 
 * Requires: SANITY_API_READ_TOKEN environment variable
 */

import { createClient } from '@sanity/client';

const projectId = 'dn63o2e7';
const dataset = 'development';
const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_READ_TOKEN environment variable is required');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'raw',
  token,
});

// Mapping: draft method ID -> published method ID (based on method name)
const methodMapping = {
  // BAK Analyse
  'drafts.a2853883-3bec-4a8f-928c-8ada97c5a4c3': '03b35df1-b665-4ce0-bd89-c54478793fa1',
  
  // Pitching
  'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6': '515b1811-6ae2-45d9-8093-4cffb9a59698',
  
  // Design Challenge
  'drafts.a29bf454-1fdd-44ce-b30f-460fb1562c48': 'f3ace106-049b-4fe7-859c-de2380cdde17',
  
  // User Tasks & Activities
  'drafts.ea8c62a0-7115-44e2-9466-ce428765a655': 'b33bb327-071c-4f24-bb48-09c76dbc1a0f',
  
  // Mid-Fidelity Prototyping -> Mid-Fidelity
  'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c': 'a2cd5a9e-fdf1-496c-8a8d-d7af44940e4e',
  
  // Usability Testing
  'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e': 'e84c15b5-74a5-4420-b315-61951a64ecc7',
  
  // Empathy Maps
  'drafts.cd20756e-e8f7-4310-98e6-6c08e195a3bd': '38633934-f1a4-4e6e-9f8f-9a30d7fe01eb',
  
  // Expert Review
  'drafts.c9ba133c-bbe1-4263-9b00-81fb6776f5f7': 'f83ea363-447e-438e-ae19-6b29f6d28e18',
  
  // W-Map
  'drafts.f253ad9b-693d-422b-9000-5e05bf33b069': '400e8a66-13a8-44d2-b59f-a5757dd0ddf3',
};

async function main() {
  console.log('Fetching impressions with draft method references...');
  
  // Get all impressions that reference draft methods
  const impressions = await client.fetch(`
    *[_type == "impression" && method._ref match "drafts.*"] {
      _id,
      "methodRef": method._ref,
      "methodName": method->name
    }
  `);
  
  console.log(`Found ${impressions.length} impressions to update.`);
  
  let updated = 0;
  let skipped = 0;
  const errors = [];
  
  for (const impression of impressions) {
    const draftMethodId = impression.methodRef;
    const publishedMethodId = methodMapping[draftMethodId];
    
    if (!publishedMethodId) {
      console.log(`⚠️  Skipping ${impression._id}: No published method found for "${impression.methodName}" (${draftMethodId})`);
      skipped++;
      continue;
    }
    
    try {
      await client
        .patch(impression._id)
        .set({
          method: {
            _type: 'reference',
            _ref: publishedMethodId,
          },
        })
        .commit();
      
      console.log(`✅ Updated ${impression._id}: ${impression.methodName} (${draftMethodId} -> ${publishedMethodId})`);
      updated++;
    } catch (error) {
      console.error(`❌ Error updating ${impression._id}:`, error.message);
      errors.push({ impressionId: impression._id, error: error.message });
    }
  }
  
  console.log('\n--- Summary ---');
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(({ impressionId, error }) => {
      console.log(`  - ${impressionId}: ${error}`);
    });
  }
  
  // Now delete the draft methods that have been replaced
  console.log('\nDeleting draft methods that have been replaced...');
  const draftMethodIdsToDelete = Object.keys(methodMapping);
  let deleted = 0;
  
  for (const draftMethodId of draftMethodIdsToDelete) {
    try {
      // Check if any impressions still reference this draft method
      const stillReferenced = await client.fetch(`
        count(*[_type == "impression" && method._ref == $draftMethodId])
      `, { draftMethodId });
      
      if (stillReferenced > 0) {
        console.log(`⚠️  Skipping deletion of ${draftMethodId}: Still referenced by ${stillReferenced} impression(s)`);
        continue;
      }
      
      await client.delete(draftMethodId);
      console.log(`✅ Deleted draft method: ${draftMethodId}`);
      deleted++;
    } catch (error) {
      console.error(`❌ Error deleting ${draftMethodId}:`, error.message);
    }
  }
  
  console.log(`\n✅ Deleted ${deleted} draft methods`);
}

main().catch(console.error);
