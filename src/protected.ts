import type {
  APIGatewayAuthorizerResultContext,
  APIGatewayProxyHandlerV2WithLambdaAuthorizer,
} from "aws-lambda";
import { AuthContext } from "./authorizer";

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<
  APIGatewayAuthorizerResultContext & AuthContext
> = async (event) => {
  console.log("Protected route event", event.requestContext);

  const userId = "test";

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${userId} from the protected route`,
    }),
  };
};
