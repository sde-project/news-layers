const cryptocompare = {
    "/cryptocompare/latest": {
        get: {
            tags: ["News"],
            description: "Get latest Cryptocompare news",
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
    "/cryptocompare/search": {
        get: {
            tags: ["News"],
            description: "Search for Cryptocompare news",
            parameters: [
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

module.exports = cryptocompare;
