import express from 'express';
import neo4j from 'neo4j-driver';
const route = express();

var driver = neo4j.driver(
    'bolt://localhost',
    neo4j.auth.basic('neo4j', 'password')
)
const session = driver.session()


route.post('/create', async (req, res, next) => {
    try {
        await session.writeTransaction(tx =>
            tx.run(
                'CREATE(n:user{username: $userNameParam, password: $userPasswordParam}) return n.username',
                {
                    userNameParam: req.body.userName,
                    userPasswordParam: req.body.userPassword
                },
            )
        )
        return res.json(`added ${req.body.userName}`)
    } finally {
        await session.close()
    }
    // on application exit:
    await driver.close()
});

route.post('/follow', async (req, res, next) => {
    try {
        await session.writeTransaction(tx =>
            tx.run(
                'Match(a:user{username: $userNameParam1}),(b:user{username: $userNameParam2}) MERGE(a)-[r:FOLLOW]->(b) return a,b',
                {
                    userNameParam1: req.body.userName,
                    userNameParam2: req.body.userToFollow
                },
            )
        )
        return res.json(`${req.body.userName} follows ${req.body.userToFollow}`)
    } finally {
        await session.close()
    }
    // on application exit:
    await driver.close()
});


export { route };
