import { useEffect, useState } from "react"

// Fetch til hent data
export const useFetch = (_url) => {

    const [data, setData] = useState()
    const [error, setError] = useState()

    const fetchData = async (apiUrl) => {

        console.log("fetch virker");

        try {
            let res = await fetch(apiUrl)
            let data = await res.json();
            setData(data)
        }

        catch (error) {
            setError(error)
        }

    }

    useEffect(() => {
        console.log("useEffect virker");
        fetchData(_url)
    }, [_url])

    return { data, error }


}