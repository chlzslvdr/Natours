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
```
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
```
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
```
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
```
db.tours.find({ price: {$lte: 500} })
```
output:
```
{ "_id" : ObjectId("5ebbdf03bd4b896754b5de02"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
```

Ex(2) Search for tours below 500 AND ratings that are equal or greater 4.8

(**AND query** - Both conditions are true)
```
db.tours.find({ price: {$lt: 500}, rating: {$gte: 4.8} })
```
output:
```
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
```

Ex(3) Search for tours below 500 OR ratings that are equal or greater 4.8

(**OR query** - Only one of the conditions need to be true)
```
db.tours.find({ $or: [ {price: {$lt: 500}}, {rating: {$gte: 4.8}} ] })
```
output:
```
{ "_id" : ObjectId("5ebbdf03bd4b896754b5de02"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b09025a"), "name" : "The Snow Adventurer", "price" : 997, "rating" : 4.9, "difficulty" : "easy" }
```

Besides our filter object, so this one, we can also pass in an object for projection.

**Projection** means is that we simply want to select some of the fields in the output.

```
db.tours.find({ $or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ]}, {name: 1 })
```

``{name: 1}`` means is that we only want the name to be in the output and so that's why we set name to one. All the others are not gonna appear in this case.

output:
```
{ "_id" : ObjectId("5ebbe1f0f296b61d7b090259"), "name" : "The Sea Explorer" }
{ "_id" : ObjectId("5ebbe1f0f296b61d7b09025a"), "name" : "The Snow Adventurer" }
```
