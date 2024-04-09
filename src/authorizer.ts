import type { APIGatewayRequestSimpleAuthorizerHandlerV2WithContext } from "aws-lambda";

export type AuthContext = {
  userId: string;
};

type AuthHandler =
  APIGatewayRequestSimpleAuthorizerHandlerV2WithContext<AuthContext>;

export const handler: AuthHandler = async (event) => {
  console.log("Authorizer event", event);
  return {
    isAuthorized: true,
    context: {
      userId: "USER_123",
    },
  };
};
