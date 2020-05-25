## Assignment A4 - Graph Algorithms for Search in Graph Database

The objective of this assignment is to provide practice in applying graph algorithms for searching in graph databases.

Your task is to import or create a sample Neo4j database, appropriate for testing graph algorithms and research this database to

- identify the most important nodes, based on their relationships

- detect the close connected communities of nodes

- discover similarity between nodes, based on their properties or behaviour

- find available routes or optimal paths between the nodes


## Network Management
I used a graph containing network services and their dependencies on eachother, I expanded on the data myself to make it a bit more interesting.

The demo have been taken from this <a href="https://neo4j.com/developer/?ref=home-2#sample-network">link</a>

### a) - identify the most important nodes, based on their relationships
Page Rank is an algorithm, used by many companies like google to measures the influence or importance of nodes in a directed graph.

```cypher
CALL gds.pageRank.stream({
  nodeProjection: 'Service',
  relationshipProjection: 'DEPENDS_ON',
  maxIterations: 20, dampingFactor: 0.85 })
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC, name ASC
```
<br>

### b) - detect the close connected communities of nodes

The Label Propagation algorithm (LPA) is a fast algorithm for finding communities in a graph. It detects these communities using network structure alone as its guide, and doesn’t require a pre-defined objective function or prior information about the communities.

```cypher
CALL gds.labelPropagation.stream({
  nodeProjection: 'Service',
  relationshipProjection: 'DEPENDS_ON'
})
YIELD nodeId, communityId
RETURN gds.util.asNode(nodeId).name AS name, communityId
ORDER BY name ASC
```
<br>

### c) - discover similarity between nodes, based on their properties or behaviour
The Node Similarity algorithm compares a set of nodes based on the nodes they are connected to. Two nodes are considered similar if they share many of the same neighbors. Node Similarity computes pair-wise similarities based on the Jaccard metric, also known as the Jaccard Similarity Score.


```cypher
CALL gds.nodeSimilarity.stream({
      nodeProjection: 'Service',
  relationshipProjection: 'DEPENDS_ON'
})
YIELD node1, node2, similarity
RETURN gds.util.asNode(node1).name AS service1, gds.util.asNode(node2).name AS service2, similarity
ORDER BY similarity DESCENDING, service1, service2
```
<br>

### d) - find available routes or optimal paths between the nodes
Since my data doesn't contain a cost, I could'nt use the path finding algorithms. Instead I just used closeness, though it doesn't return paths. So this was just to not leave this answer empty!

Closeness centrality is a way of detecting nodes that are able to spread information very efficiently through a graph.

The closeness centrality of a node measures its average farness (inverse distance) to all other nodes. Nodes with a high closeness score have the shortest distances to all other nodes.


```cypher
CALL gds.alpha.closeness.stream({
  nodeProjection: 'Service',
  relationshipProjection: 'DEPENDS_ON'
})
YIELD nodeId, centrality
RETURN gds.util.asNode(nodeId).name AS service, centrality
ORDER BY centrality DESC
```
