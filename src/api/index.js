const API_URL = 'https://api.thecatapi.com/v1'
const API_KEY = 'live_aeG37rNGYGefoqhbQkqRnmI5OLYAp4ecMMCaM2wZRYrcTztUahjbfsStBiWx97Yt'
const API_DEMO_KEY = 'DEMO-API-KEY'
const SUB_ID =  'myUnicId_123321999'

export const getRandomImage = async () => {
    try {
        const response = await fetch(`${API_URL}/images/search?limit=1`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch(err) {
        console.error(err)
    }
}

export const setFavourite = async imageId => {
    const body = {
        image_id: imageId,
        sub_id: SUB_ID
    }

    await fetch(`${API_URL}/favourites`, {method: 'POST', body: JSON.stringify(body), headers: {
        'content-type': "application/json",
        'x-api-key': API_DEMO_KEY
    }})
}

export const setVote = async (imageId, value) => {
    const body = {
        image_id: imageId,
        value
    }

    await fetch(`${API_URL}/votes`, {method: 'POST', body: JSON.stringify(body), headers: {
            'content-type': "application/json",
            'x-api-key': API_DEMO_KEY
        }})
}

export const getVotes = async () => {
    try {
        const response = await fetch(`${API_URL}/votes?limit=30&order=DESC`, {headers: {
                'x-api-key': API_DEMO_KEY
        }})

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error('API error', err)
    }
}

export const getFavourites = async () => {
    try {
        const response = await fetch(`${API_URL}/favourites?limit=20&sub_id=${SUB_ID}&order=DESC`, {headers: {
                "content-type": "application/json",
                'x-api-key': API_DEMO_KEY
        }})

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

export const getBreeds = async () => {
    try {
        const response = await fetch(`${API_URL}/breeds`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return  await response.json()
    } catch (err) {
        console.error(err)
    }
}

export const getFilteredImages = async (order, breed) => {
    try {
        const response = await fetch(`${API_URL}/images/search?limit=300&order=${order}${breed !== 'none' && `&breed_ids=${breed}`}&api_key=${API_KEY}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return  await response.json()
    } catch (err) {
        console.error(err)
    }
}

export const getImagesByBreed = async breedID => {
    try {
        const limit = 5
        const response = await fetch(`${API_URL}/images/search?limit=${limit}&breed_ids=${breedID}&api_key=${API_KEY}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

export const getImageById = async imageId => {
    try {
        const response = await fetch(`${API_URL}/images/${imageId}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}