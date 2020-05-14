## Introduction to MongoDB

### Install MongoDB
Download and Install [MongoDB](https://www.mongodb.com/download-center/community)

### Setup (for MAC)
In the terminal, run:
```bash
sudo cp {drag_all_items_of_bin_folder_of_the_downloaded_file} /usr/local/bin
cd /usr/local/bin
sudo mkdir /data/db
sudo chown -R `id -un` /data/db
```

To run the ``Mongo Server``:
```bash
mongod
```
To stop existing mongod servers:
```bash
killall mongod
```
To open the ``Mongo Shell``:
```bash
mongo
```

## Creating a Local Database
In the ``Mongo Shell`` terminal run the ``use`` command to **create** a new database or **switch** to existing database:
```bash
use natours-test

// Insert a document in this database collection
db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7  })
```

output:
```bash
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5ebbdf03bd4b896754b5de02")
}
```

To check if it is inserted:
```bash
db.tours.find()
```
output:
```bash
{ "_id" : ObjectId("5ebbdf03bd4b896754b5de02"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
```

``show`` all the databases we have:
```bash
show dbs
```

``show`` all available collections:
```bash
show collections
```

To quit the ``Mongo Shell``:
```bash
quit()
```

## CRUD Operations
### Creating Documents
To create two new documents at the same time:

```bash
db.tours.insertMany([{ name: "The Sea Explorer", price: 497, rating: 4.8  }, { name: "The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy"  }])
```
output:
```bash
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5ebbe1f0f296b61d7b090259"),
		ObjectId("5ebbe1f0f296b61d7b09025a")
	]
}
```

### Querying (Reading) Documents
To search a specific tour:
```bash
db.tours.find({ name: "The Sea Explorer" })
```

**Special Query Operator**

Ex(1) Search for tours below 500

``lte`` stands for less than or equal
```bash
db.tours.find({ price: {$lte: 500} })
```
output:
```bash
{ "_id" : ObjectId("5ebbdf03bd4b896754b5de02"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
```

Ex(2) Search for tours below 500 AND ratings that are equal or greater 4.8

(**AND query** - Both conditions are true)
```bash
db.tours.find({ price: {$lt: 500}, rating: {$gte: 4.8} })
```
output:
```bash
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
```

Ex(3) Search for tours below 500 OR ratings that are equal or greater 4.8

(**OR query** - Only one of the conditions need to be true)
```
db.tours.find({ $or: [ {price: {$lt: 500}}, {rating: {$gte: 4.8}} ] })
```
output:
```bash
{ "_id" : ObjectId("5ebbdf03bd4b896754b5de02"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b09025a"), "name" : "The Snow Adventurer", "price" : 997, "rating" : 4.9, "difficulty" : "easy" }
```

Besides our filter object, so this one, we can also pass in an object for projection.

**Projection** means is that we simply want to select some of the fields in the output.

```bash
db.tours.find({ $or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ]}, {name: 1 })
```

``{name: 1}`` means is that we only want the name to be in the output and so that's why we set name to one. All the others are not gonna appear in this case.

output:
```bash
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer" }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b09025a"), "name" : "The Snow Adventurer" }
```

### Updating Documents
``updateOne`` - you know that this query only matched one. If two to more matched this query, only the first one will be updated

``updateMany`` - if query will matched multiple documents

```bash
db.tours.updateOne({ name: "The Snow Adventurer" }, {$set: {price: 597} })
```

output:
```bash
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

Can add new field:

Find premium tours and give them a premium field set to true. The price should be greater than 500 and ratings that are greater than or equal to 4.8
```bash
db.tours.find({ price: {$gt: 500}, rating: {$gte: 4.8} })

db.tours.updateMany({ price: {$gt: 500}, rating: {$gte: 4.8} }, { $set: {premium: true} })
```
output:
```bash
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

db.tours.find()
{ "_id" : ObjectId("5ebbdf03bd4b896754b5de02"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b09025a"), "name" : "The Snow Adventurer", "price" : 597, "rating" : 4.9, "difficulty" : "easy", "premium" : true }
```

### Deleting Documents
``deleteOne`` -  will only work for the first document matching your query

``deleteMany`` - will work for all the documents matching your query

Delete all the tours which have a rating less than 4.8
```bash
db.tours.deleteMany({rating: {$lt: 4.8}})
```
output:
```bash
{ "acknowledged" : true, "deletedCount" : 1 }
```

To delete all:
```bash
db.tours.deleteMany({})
```

### Using Compass App for CRUD Operations
Download and Install [MongoDB Compass](https://www.mongodb.com/download-center/compass)

### Creating a Hosted Database with Atlas
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

**Cluster** an instance of our database
