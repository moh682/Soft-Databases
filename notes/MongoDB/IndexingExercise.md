### Indexing Exercise for MongoDB

MongoDB has prebuilt indexing, and is using several of the best data structures for indexing. They include classic B-tree.

Experimenting with Indexing

Create a phones collection
```bash
mongo phones
```

The following code creates the function to execute some dummy data for the experiment. 
```javascript
populatePhones = function(area, start, stop) {
  for (let i = 0; i < stop; i++) {
    var country = 1 + ((Math.random() * 8 ) << 0);
    var num = (country * 1e10) + (area * 1e7) + i;
    var fullNumber = "+" + country + " " area + "-" + i;
    db.phones.insert({
      _id: num,
      components: {
        country: country,
        area: area,
        prefix: (i * 1e-4) << 0,
        number: i
      },
      display: fullNumber
    });
    print("Inserted number " + fullNumber);
  }
  print("done!");
}
```

To create the data we just have to call the function in the terminal.
```javascript
populatePhones(800, 5550000, 5650000) 
```
This could take a minute.

We have now created 100,000 phone numbers. a great number to use for the experiment. Now before we make the collection use indexing, lets see how much it takes to find a value. To do that run the following code in the terminal.

```javascript
db.phones.find({display: "+1 800-5650001"}).
  explain("executionStats").executionStats
```

If you dont have everything already set up, i will give you the average stats. the code above would return the following
```json
{
"executionTimeMillis": 52, "executionStages": {
"executionTimeMillisEstimate": 58, }
}
```
So basically the execution time took 52 ms.

After we have seen how long it takes to retrieve the data. Lets try the same with with indexing. But first we create the indexing for the collection. 

We do that by following
```javascript
db.phones.ensureIndex(
{ display : 1 },
{ unique : true, dropDups : true }
)
```

Now lets try it again 
```javascript
db.phones.find({display: "+1 800-5650001"}).
  explain("executionStats").executionStats
```

And the result is
```json
{
"executionTimeMillis" : 0, "executionStages": {
"executionTimeMillisEstimate": 0, }
}
```