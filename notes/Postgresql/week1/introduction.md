

A way of deciding the databases could be based on the data and not the problem.

### Relational Databases

#### Data modeling
##### Conceptual

Conseptual Model in data modelling is about defining what data there is to be stored in the database. 

##### Logic
##### Physical


### Database normalisation
Database normalisation is a technique of organizing the data in the database. Normalization is a systematic approach of decompose the database to reduce data redundancy (Repetition), and prevent undesirable characteristics when performing transactions like Insert, Update, Delete and Select. 

https://www.studytonight.com/dbms/database-normalization.php

#### Problems without Normalization 

**Insertaion Anomalies**
repeated anomalies like having the same value in many rows ( redundency ).

Example: If we made two columns in one table, where one colum labelled "name" and the other "class". If we added 100 students. the same class would be repeated 100 times. 

**Update Anomalies**
Preventing bad update anomalies like having to update every single row when a simple change happens. 

Example: When we take the example above. If we by any chance say all the students left the class. We would have to update every. This could be better optimized by following normalization.


**Deletion Anomalies**
Deletion anomaly is when extra information that can be prevented when implementing normalization approach. 

Example: When we are talking about the table we metioned above. We can say if we want to delete one of the information we would have to delete the students as well. This is the delete anomaly we are trying to prevent.


#### Normalization Rules
Normalization rules are divided into Normalization forms, to complete a form some specifications have to be met. There are currently 4 Forms and some would argue there are 6. We will cover them all in here.


##### Normalization Form 1
* **Every Column Should only have a Single(Atomic) Value.**
* **Values Stored in a column should be of same domain.**
* **All the columns in a table should have unique names.**
* **And the order in which data is stored, does not matter.**

*Values stores in a column should be of same domain*
As an example if we have a column labelled phone number, there should only be phone number values. We are not allowed to add for example an address in the value. 

*All the columns in a table should have unique names*
All column labels should have unique names, so we prevent the duplication of column labels for tables.

*And the order in which the data is stored, does not matter* 
The order which we insert in does not matter, there are no need to sort the table before we insert. 

##### Normalization Form 2
* **First Normalizations steps should be completed.**
* **It should not have Partial Dependancy.**

*First Normalizations stes should be completed*
The first normal form should be completed before moving to the second normal form

*It should not have Partial Dependancy*
Which is having one table/column dependent on another that cause duplication on one of the tables/columns. The following images explain it well.

<img src="../images/NF2_1.png" />
As we can see Manufacturer country are dependent on Manufacturer, and can cause duplication if multiple models are made from the same Manufacturer. 

##### Normalization Form 3
* **Second Normalization step should be completed.**
* **It doesn't have Transitive Dependancy.**


*Second Normalization step should be completed*
Ut means we cannot move to third normal form without completing the first normal form.

*It doesnt have Transitive Dependancy* 
It is when a table/column is dependent on a column that is dependent on another column. in short it means that a column is dependent on a column that is depended on a column, in one table. And that when editing can lead to unconsistency. 

<center>
	(x -> y -> z) in one table
</center>

That is transitive dependancy

<a href="https://www.youtube.com/watch?v=_K7fcFQowy8" > This is a great demonstration on Transitive Dependancy and how to spot them.</a>  


##### Boyce and Codd Normal Form (BCNF)
This Normal form is a higher level of the third form, and deals with anomalies not handled by the third Normal form. 
* **Third Normal form should be completed.**
* **For each functional dependancy ( X -> Y ), X should be a super Key.**



##### Normalization Form 4
* **BCNF Should be completed.**
* **It does not have Multi-Valued Dependancy.**


### Database Denormalization
Denormalization is changing a normalized database inchange of some performance gain. Usually it is used to increase the performance of the read functionality by making redundant data in the database. 

An example for using denormalization in a database is, if the database is seperated on two different disks. In that case it will take a toll on the performance to retrieve and join tables. In that case it makes sence to denormalize the database and have redundant data to increase performance.

##### Functional Dependancy

Functional Dependancy is a relational between two attributes typically between the primary key and other non-key attributes within a table. 

An example in the following tables.

|primary_key|name|number|
|-|-|-|
|1|moe|123131|

in the above example name is functional dependant on the primary key and will be drawned like the following

<center>
	 ( primary_key -> name )
</center>
##### Database Indexing

A database indexing is a data structure that improves the retrieval of data. 

##### View 

View have some benefist, some of them are:
- Security
- Simplicity

**Security**
When creating a view on a table, you can specify which of the attributes in the table are to be shown, this could be that the table has an attribute like password that we do not want users to retrieve from the database, or other kind of information. 

**Simplicity**
You can also create views on complex join queries, So later on you dont have to redo the whole query, you just have to write the identifier that is for the view.

##### Transaction

Transaction is a sequence of operations normally being one or more statements. Transactions can contain logic and have rollbacks to abort the transaction. Transactions can be when the logic can have critical malfunction which should result in the whole transaction being aborted. 

###### ACID
ACID which stands for Atomic Consistent Isolated Durability, is about insuring the data remaining consistance despite any failures.

**Atomic**
Atmoicity means guaranteeing thatx either everything succeed or nothing does

**Consistency**
This isures that the data is consitent in the transactions.

**Isolation**
This mean that current transactions are not effected by other transactions, like in deadlocks or updates. 

**Durability**
This mean after the transaction has succeeded the result would remain in the system permanently. 

##### ER-Diagram

ER diagrams used to design the database and demonstrate its relations and attributes for the tables. It gives great overview the database.

##### Stick words

##### Relational Algebra Operations


