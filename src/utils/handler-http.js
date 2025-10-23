
const handlerHttp = async (url, options = {}) => {

    try {
        
        const res = await fetch(url, options) // petición GET (default)

        if ( !res.ok ) {
            throw new Error('No se pudieron obtener los productos')
        }

        const data = await res.json()

        return data

    } catch (error) {
        throw error
    }

}

export default handlerHttp