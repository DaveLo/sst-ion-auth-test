import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("main route event", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from the main route",
    }),
  };
};
