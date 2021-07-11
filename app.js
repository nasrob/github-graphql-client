require('dotenv').config()
const express = require('express')
const app = express()
const fetch = require('node-fetch')


app.use(express.static('public'))


app.get('/data', async (req, res) => {
    const query = `
        {
            search(query: "stars:>50000", type: REPOSITORY, first: 10) {
                repositoryCount
                edges {
                    node {
                        ... on Repository {
                            name
                            owner {
                                login
                            }
                            stargazers {
                                totalCount
                            }
                        }
                    }
                }
            }
        }
    `

    const url = 'http://api.github.com/graphql'

    const options = {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + process.env.APIKEY
        },
        body: JSON.stringify({ 'query': query }),
    }

    let response
    try {
        response = await fetch(url, options)
    } catch (err) {
        console.error(err)
    }
    const data = await response.json()

    console.log(data)

    res.json(data)
})

app.listen(3000, () => console.log('Server Ready'))