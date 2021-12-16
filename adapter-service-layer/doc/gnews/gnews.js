const gnews = {
    "/gnews/latest": {
        get: {
            tags: ["News"],
            description: "Get latest GNews news",
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
    "/gnews/search": {
        get: {
            tags: ["News"],
            description: "Search for gnews news",
            parameters: [
                {
                    $ref: "#/components/parameters/FromDate"
                },
                {
                    $ref: "#/components/parameters/ToDate"
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

module.exports = gnews;
