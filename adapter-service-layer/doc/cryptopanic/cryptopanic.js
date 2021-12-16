const cryptopanic = {
    "/cryptopanic/latest": {
        get: {
            tags: ["News"],
            description: "Get latest cryptopanic news",
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
    "/cryptopanic/search": {
        get: {
            tags: ["News"],
            description: "Search for cryptopanic news",
            parameters: [
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

module.exports = cryptopanic;
