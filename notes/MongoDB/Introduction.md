## Intended learning outcomes
**To be able to explain the difference between relational and non-relational databases.**
**To get fimiliar with the various types of non-relational databses.**
**To be able to make a choice of database depending on the task and requirements.**
**To get skills in converting data between SQL and NoSQL formats.**

## Agenda
**NoSQL vs SQL**
**NoSQL database types**
**NoSQL in SQL DBMS**

## What is SQL Database
* Relational Database has a well organized structure of data stored in related tables
* Providing fast access and retrieval of data from multiple tables
* ACID features
* * Atomicity - ensures that transactions with data are either completed, or rolled back
* * Consisstency - after the transactions are completed the data is still consistent and integral
* * Isolation - concurrent operations are isolated from each other
* * Durability - the effect of the operations is available and secured

## SQL database is not sufficient
For supporting large applications that
* * Needs replication or sefmentation
* * Is too complex to maintain
* * Acid rules are not achievable in distributed environments

## NoSQL database is
* * ***Not*** Relational database
* * Not only SQL
* * NoSQL does not define what it is, but what it isn't

## Why NoSQL? 
** The quantity of collected data grows dramatically
** Modern data is unstructured and social
** Impossible to organize and store it in relational structures

Web Application Data grows exponentially based on Business Data Transaction.
<a href="../images/appDataGrowth.png" />


## NoSQL can help
**Designed for the need of very large data stores
* **such as Google or Facebook**
* **Data comes frequently**
* **Scaling required permanently**
* **fixed schema not known**
* **Individual data records may not matter**
**Data operations not complicated**
* **Mostly logs and reducing or aggregation**

## Cap Theorem vs Acid Rules

