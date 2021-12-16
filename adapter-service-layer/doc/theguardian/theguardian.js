const theguardian = {
    "/theguardian/latest": {
        get: {
            tags: ["News"],
            description: "Get latest The Guardian news",
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
    "/theguardian/search": {
        get: {
            tags: ["News"],
            description: "Search for theguardian news",
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

module.exports = theguardian;
