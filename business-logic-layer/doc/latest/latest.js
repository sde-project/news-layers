const latest = {
    "/latest": {
        get: {
            tags: ["News"],
            description: "Get latest news",
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
    "/latest/currency/:currency": {
        get: {
            tags: ["News"],
            description: "Search for news",
            parameters: [
                {
                    $ref: "#/components/parameters/CurrencyPath"
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

module.exports = latest;
