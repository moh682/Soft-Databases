##### Graph Terminology

The Query language for Neoj4 is called Cypher. Its different from any other databases like sql or noSQL like mongoDB. In graph every node act like document because they store properties.
What makes Neoj4 special is that those nodes takes center stage.

##### Ways of interacting with Neo4j via Cypher

Like many other databases its possible to interact with Neoj4 database via a REST API, and two other query languages: Gremlin and Cypher. while Gremlin has some interesting properties Cypher is now considered standard. And connection between nodes are called relationships and not edges. 

##### What is Cypher?
Cypher is a rich, Neo4js-specific graph traversal language. In Cypher graph datapoints unlike mathematical graph theory, are called nodes.

**Terminology**
* **Node in graph**: *a node is a vertex between edges that may hold data. Data is stored in a key-value pairs like in some NoSQL databases*

Cypher typically look something like this.
```C
$ MATCH [some set of nodes and/or relationships]
  WHERE [some set of properties holds]
  RETURN [some set of results captured by the MATCH and WHERE clauses]
```

##### How to create, read, update, delete in graph?

**create**
When inserting to a graph in cypher, you dont insert types but labels. Meaning there is no need to specify which type the property is holding. To create a new node in graph, the following syntax should be followed. In the input field

```C
$ CREATE (p: [document] { [properties] } )
```

More on create clause <a href="https://neo4j.com/docs/cypher-manual/current/clauses/create/">here </a>

**read**
To read all the inserted nodes, insert the following in the inputfield.
```C
$ MATCH (n) return n;
```

