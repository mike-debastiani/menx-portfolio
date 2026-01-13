/**
 * Script to fix impression references from draft methods to published methods
 * Run with: node fix-method-references.js
 */

// Mapping: draft method ID -> published method ID
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

// Impressions that need to be updated (draft method ref -> published method ref)
const impressionsToUpdate = [
  // BAK Analyse
  { id: 'drafts.15a97888-f4c1-42bb-9faf-e96477fb0734', methodRef: 'drafts.a2853883-3bec-4a8f-928c-8ada97c5a4c3' },
  { id: 'drafts.1f92f7c8-5d32-4e78-aa57-87a4c6725861', methodRef: 'drafts.a2853883-3bec-4a8f-928c-8ada97c5a4c3' },
  { id: 'drafts.3d53f746-e18a-43d8-9f01-f4130ad26355', methodRef: 'drafts.a2853883-3bec-4a8f-928c-8ada97c5a4c3' },
  { id: 'drafts.96a0add2-21dd-43be-8391-4379729a9b89', methodRef: 'drafts.a2853883-3bec-4a8f-928c-8ada97c5a4c3' },
  
  // Pitching
  { id: 'drafts.1b613ecc-935b-49b8-b948-9758be09592e', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.1ffe3950-7868-47a4-93bc-c9759a4f8787', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.2f8a8ddf-7387-4978-9e56-042c7d121ea1', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.3ab873b9-0f98-4592-8e1f-043d258cdf99', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.6f02b50e-c245-457e-aed6-fde9d301acd5', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.9029e677-2c9c-4acc-a3e2-a08a485726da', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.9cbe6dec-ced1-4098-9566-810184f7cb3d', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  { id: 'drafts.ea48575c-85db-43e1-970c-660092448f5e', methodRef: 'drafts.e277b5b2-dc71-4455-a9d2-ba47637188c6' },
  
  // Design Challenge
  { id: 'drafts.1c0af378-df7b-4043-b9c1-a70c68dc1853', methodRef: 'drafts.a29bf454-1fdd-44ce-b30f-460fb1562c48' },
  { id: 'drafts.aa84d9f7-12bb-4117-ab58-16d7e2014491', methodRef: 'drafts.a29bf454-1fdd-44ce-b30f-460fb1562c48' },
  { id: 'drafts.ee19722a-40c8-4f8f-9436-0b45e939409e', methodRef: 'drafts.a29bf454-1fdd-44ce-b30f-460fb1562c48' },
  
  // User Tasks & Activities
  { id: 'drafts.26a5d024-0d1f-4396-b83a-99004c77fab1', methodRef: 'drafts.ea8c62a0-7115-44e2-9466-ce428765a655' },
  { id: 'drafts.2ad97b38-f020-4c4e-9ff2-d1bbbdf7e6db', methodRef: 'drafts.ea8c62a0-7115-44e2-9466-ce428765a655' },
  { id: 'drafts.5fe0524e-6fda-482a-9b95-5a8fe06a8de6', methodRef: 'drafts.ea8c62a0-7115-44e2-9466-ce428765a655' },
  { id: 'drafts.aad9fe4b-1e03-4c30-9df2-1c591d26f4ad', methodRef: 'drafts.ea8c62a0-7115-44e2-9466-ce428765a655' },
  { id: 'drafts.f4c05dfb-a29f-4d41-9d0c-1768007998e0', methodRef: 'drafts.ea8c62a0-7115-44e2-9466-ce428765a655' },
  
  // Mid-Fidelity Prototyping
  { id: 'drafts.3c4d2ea9-e707-4bec-8dd3-f9c8c9b86a4c', methodRef: 'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c' },
  { id: 'drafts.787a9f68-f5bc-429b-a432-2b7774d79c73', methodRef: 'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c' },
  { id: 'drafts.90c724fe-27a5-4811-905d-022d7d7884a6', methodRef: 'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c' },
  { id: 'drafts.d90b944f-f3a1-4b75-ab64-a16762076c46', methodRef: 'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c' },
  { id: 'drafts.dc090f70-77fb-4d0e-9e9d-cc32721ac3cf', methodRef: 'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c' },
  { id: 'drafts.f74d40b7-5661-4937-ad8b-80a42fa1eca5', methodRef: 'drafts.de5c30c3-0bdd-4637-b44b-8f51f002d92c' },
  
  // Usability Testing
  { id: 'drafts.549970fa-d19e-40bf-b351-8aa40f8177a1', methodRef: 'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e' },
  { id: 'drafts.7642bef0-4e7e-44a8-9e39-52ab6d166e81', methodRef: 'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e' },
  { id: 'drafts.a1dcf6d2-74b6-4b16-a59d-5323532c97a1', methodRef: 'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e' },
  { id: 'drafts.b4050bfc-b893-4981-9b51-acbfab6f4b0a', methodRef: 'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e' },
  { id: 'drafts.c5caa3cc-1b3c-4826-b174-b67b8056c674', methodRef: 'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e' },
  { id: 'drafts.e196a4ea-9371-4560-9778-a6db0cc5583e', methodRef: 'drafts.cadf6982-f474-47dc-98f2-37d52c163a6e' },
  
  // Empathy Maps
  { id: 'drafts.5e98a822-770a-4037-b245-069853736bb2', methodRef: 'drafts.cd20756e-e8f7-4310-98e6-6c08e195a3bd' },
  { id: 'drafts.61ca98ed-d0a7-46e5-bf01-cb5d35d7067e', methodRef: 'drafts.cd20756e-e8f7-4310-98e6-6c08e195a3bd' },
  { id: 'drafts.74072d6a-a0dc-4f8b-8159-0cf7f3799fcb', methodRef: 'drafts.cd20756e-e8f7-4310-98e6-6c08e195a3bd' },
  { id: 'drafts.ba082fea-78f1-4157-a949-27f487cb6454', methodRef: 'drafts.cd20756e-e8f7-4310-98e6-6c08e195a3bd' },
  
  // Expert Review
  { id: 'drafts.79a0c2c1-377b-4047-b336-b8c32d596fd6', methodRef: 'drafts.c9ba133c-bbe1-4263-9b00-81fb6776f5f7' },
  { id: 'drafts.889479a2-a370-4153-a19c-2188b0188de7', methodRef: 'drafts.c9ba133c-bbe1-4263-9b00-81fb6776f5f7' },
  { id: 'drafts.9a1b3a7a-56d8-4296-8700-af7f81498067', methodRef: 'drafts.c9ba133c-bbe1-4263-9b00-81fb6776f5f7' },
  
  // W-Map
  { id: 'drafts.43a8541b-5da8-4dc0-9eb2-962af6be88d4', methodRef: 'drafts.f253ad9b-693d-422b-9000-5e05bf33b069' },
  
  // Desirability Testing (no published version found - skip for now)
  // User Story (no published version found - skip for now)
  // LLM Training (no published version found - skip for now)
  // Next.js Framework (no published version found - skip for now)
];

console.log('This script needs to be run with the Sanity CLI or via the MCP tools.');
console.log(`Found ${impressionsToUpdate.length} impressions to update.`);
console.log('Method mapping:', methodMapping);
