const nytimes = {
    "/nytimes/latest": {
        get: {
            tags: ["News"],
            description: "Get latest New York Times news",
            parameters: [
                {
                    $ref: "#/components/parameters/Number"
                }
            ],
            responses: {
                200: {
                    $ref: "#/components/responses/NewsResponse"
                },
                400: {
                    $ref: "#/components/responses/IllegalInput"
                },
                401: {
                    $ref: "#/components/responses/Unauthorized"
                },
                500: {
                    $ref: "#/components/responses/ServerError"
                }
            }
        }
    },
    "/nytimes/search": {
        get: {
            tags: ["News"],
            description: "Search for nytimes news",
            parameters: [
                {
                    $ref: "#/components/parameters/FromDate"
                },
                {
                    $ref: "#/components/parameters/ToDate"
                },
                {
                    $ref: "#/components/parameters/Number"
                },
                {
                    $ref: "#/components/parameters/Currency"
                }
            ],
            responses: {
                200: {
                    $ref: "#/components/responses/NewsResponse"
                },
                400: {
                    $ref: "#/components/responses/IllegalInput"
                },
                401: {
                    $ref: "#/components/responses/Unauthorized"
                },
                500: {
                    $ref: "#/components/responses/ServerError"
                }
            }
        }
    }
}

module.exports = nytimes;
