# HBase Database

Hbase is a database used for heavy duties. It's described like a nail gun. You wont use nail gun for small tasks. Hbase is best used when the server has gigabytes and gigabytes of data. In fact if you dont have that much, you are probably better of selecting another database.

### Hbase at first glance
Looks like a relational database because the terminology is very similiar.


### why use hbase
hbase have a schema fofr performance gain
hbase does not scale down
hbase have versioning
compression
garbage collecting ( for expired data )
hbase have atomicity at the row level, meaning it have the "either all or nothing", like in Relational-databases
searching in database is where hbase truly excels, this is also why its better to use when we have a lot of data



### keys
- hbase is a column-oriented database
- based on Bigtable, which is developed by google.
- hbase designed to be fault tolerant through hardware or network. Hbase can recover becuase it uses both *write-ahead logging*. It sets it in memory before its written, so later the files can be used to recover the nodes, and *ditributed configuration* which mean nodes can rely on each other for configuration than on a centralized source.