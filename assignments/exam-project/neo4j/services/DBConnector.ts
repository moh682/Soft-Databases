import neo4j from 'neo4j-driver';
import colors from 'colors';

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'));
const session = driver.session();

(() => {
  session.readTransaction(async tx => {
    const result = await tx.run('MATCH (n) RETURN n');
    if (result) {
      console.log(colors.green('Neo4j is connected'));
    } else {
      console.log(colors.red('Neo4j is not connected'));
    }
  });
})();

export { session as connection };
