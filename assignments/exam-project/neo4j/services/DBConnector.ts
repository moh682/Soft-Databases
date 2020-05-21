import neo4j from 'neo4j-driver';

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'));
const session = driver.session();

export { session as connection };
