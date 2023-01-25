// ID 부여를 위한 제수
const ID_DIVISTION_NUMBER = 1_000_000_000

// fetch BASE URL
const HOST = "http://localhost:3000";

// fetch method
const METHOD = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

// fetch header
const HEADER = {
    PATCH: {'Content-Type': 'application/json'},
    POST: {'Content-Type': 'application/json'}
}

export { 
    // ID 부여를 위한 제수
    ID_DIVISTION_NUMBER,

    // fetch BASE URL
    HOST,

    // fetch method
    METHOD,

    // fetch header
    HEADER,
}