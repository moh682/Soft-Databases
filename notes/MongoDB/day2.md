## Indexing, Aggregation And Mapreduce

### Indexing
Indexing are used to improve the performance of searching in a database. Its essensial for many large datasets and is used in most databases and mongoDB is not different. 

Indexing in MongoDB can be achieved in no time. I have created an experiment that everyone can follow <a href="./IndexingExercise.md">here</a>

**Conclusion**
Creating and Index on a large collection can be source-intensive. It cost more in Mongo than any other relational database because of Mongos' schemaless nature. Thats why its important to create them in off-peak times, especially when creating them manually. 

### Aggregation

Aggregators are used to return the document based on the logic that you specify. MongoDB has a built in aggregate function. This method is very powerfull and enables you to define a pipeline-style logic consisting of stages such as: **\$match** filters that return the matching result: **\$group** functions groups the result based on attributes that you define: **\$sort** sorts the lists by a key. 