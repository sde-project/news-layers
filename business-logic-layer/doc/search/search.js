const search = {
    "/search": {
        get: {
            tags: ["News"],
            description: "Search for news",
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
                    $ref: "#/components/parameters/CurrencyQuery"
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

module.exports = search;
