import { MongoClient } from "mongodb";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const OLD_URI = "mongodb://vermaji1372005_db_user:gA1yNQiQ7tluV8B4@ac-a20mt3a-shard-00-00.cfx80c9.mongodb.net:27017,ac-a20mt3a-shard-00-01.cfx80c9.mongodb.net:27017,ac-a20mt3a-shard-00-02.cfx80c9.mongodb.net:27017/growvia?ssl=true&replicaSet=atlas-6tfb7e-shard-0&authSource=admin&retryWrites=true&w=majority";
const NEW_URI = "mongodb+srv://careerguidence99_db_user:X3tX3NJcjDQ8XGNs@cluster0.efacm9j.mongodb.net/growvia?retryWrites=true&w=majority&appName=Cluster0";

const migrateData = async () => {
  console.log("==================================================");
  console.log("🚀 Starting Full MongoDB Migration to New Cluster");
  console.log("==================================================");

  let oldClient, newClient;

  try {
    console.log("📡 Connecting to Source (Old) Cluster...");
    oldClient = new MongoClient(OLD_URI, { serverSelectionTimeoutMS: 15000 });
    await oldClient.connect();
    const oldDb = oldClient.db("growvia");
    console.log("✅ Connected to Source Cluster: growvia");

    console.log("📡 Connecting to Destination (New) Cluster...");
    newClient = new MongoClient(NEW_URI, { serverSelectionTimeoutMS: 15000 });
    await newClient.connect();
    const newDb = newClient.db("growvia");
    console.log("✅ Connected to Destination Cluster: growvia");

    const collections = await oldDb.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections to migrate:`);
    collections.forEach((c) => console.log(` - ${c.name}`));

    console.log("\n==================================================");
    console.log("📦 Copying Collections & Documents...");
    console.log("==================================================");

    for (const collInfo of collections) {
      const collName = collInfo.name;
      // Skip system collections if any
      if (collName.startsWith("system.")) continue;

      const sourceColl = oldDb.collection(collName);
      const destColl = newDb.collection(collName);

      const count = await sourceColl.countDocuments();
      if (count === 0) {
        console.log(`ℹ️ [${collName}]: 0 documents (empty collection, creating empty in destination)`);
        await newDb.createCollection(collName).catch(() => {});
        continue;
      }

      console.log(`⏳ [${collName}]: Fetching ${count} documents from source...`);
      const docs = await sourceColl.find({}).toArray();

      // Clear any pre-existing docs in destination to avoid duplicates
      await destColl.deleteMany({});

      // Insert all documents preserving exact _id and BSON types
      const insertResult = await destColl.insertMany(docs, { ordered: true });
      console.log(`✅ [${collName}]: Successfully copied ${insertResult.insertedCount} / ${count} documents.`);

      // Copy indexes (except default _id_ index)
      try {
        const indexes = await sourceColl.indexes();
        for (const idx of indexes) {
          if (idx.name === "_id_") continue;
          const { key, name, unique, sparse, expireAfterSeconds } = idx;
          const options = { name };
          if (unique) options.unique = true;
          if (sparse) options.sparse = true;
          if (expireAfterSeconds !== undefined) options.expireAfterSeconds = expireAfterSeconds;

          await destColl.createIndex(key, options).catch((err) => {
            console.warn(`  ⚠️ Could not replicate index ${name} on ${collName}: ${err.message}`);
          });
        }
      } catch (idxErr) {
        console.warn(`  ⚠️ Index copy warning on ${collName}: ${idxErr.message}`);
      }
    }

    console.log("\n==================================================");
    console.log("🔍 Verifying Destination Cluster Data...");
    console.log("==================================================");

    const destCollections = await newDb.listCollections().toArray();
    let totalMigrated = 0;
    for (const c of destCollections) {
      const destCount = await newDb.collection(c.name).countDocuments();
      const srcCount = await oldDb.collection(c.name).countDocuments();
      const status = destCount === srcCount ? "MATCH ✅" : "MISMATCH ⚠️";
      console.log(`📊 ${c.name.padEnd(22)}: Source = ${String(srcCount).padStart(3)} | Destination = ${String(destCount).padStart(3)} [${status}]`);
      totalMigrated += destCount;
    }

    console.log("==================================================");
    console.log(`🎉 Migration Completed Successfully! Total docs in new cluster: ${totalMigrated}`);
    console.log("==================================================\n");

  } catch (err) {
    console.error("❌ Migration Failed with Error:", err);
    process.exit(1);
  } finally {
    if (oldClient) await oldClient.close();
    if (newClient) await newClient.close();
  }
};

migrateData();
