import neo4j from 'neo4j-driver';
import colors from 'colors';
import { NEO4J_USERNAME, NEO4J_PASSWORD } from '../../constants';

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
const session = driver.session();

(() => {
  session.readTransaction(async tx => {
    const result = await tx.run('MATCH (n) RETURN n');
    if (result) {
      console.log(colors.green('Neo4j is connected'));
    } else {
      console.log(colors.red('Neo4j is not connected'));
    }
    tx.commit();
  });
})();

export { session as connection };
