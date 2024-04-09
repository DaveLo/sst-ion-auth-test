/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "api-auth-test",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("Api");

    const authorizerFn = new sst.aws.Function("Authorizer", {
      handler: "src/authorizer.handler",
      environment: {},
    });

    const authorizer = new aws.apigatewayv2.Authorizer("APIGWAuthorizer", {
      apiId: api.nodes.api.id,
      authorizerType: "REQUEST",
      authorizerUri: authorizerFn.nodes.function.invokeArn,
      identitySources: ["$request.header.Authorization"],
      name: "test-authorizer",
      authorizerPayloadFormatVersion: "2.0",
    });

    api.route("GET /", {
      handler: "src/main.handler",
    });

    api.route(
      "GET /protected",
      {
        handler: "src/protected.handler",
      },
      {
        transform: {
          route: (routeArgs: sst.aws.ApiGatewayV2RouteArgs) => ({
            ...routeArgs,
            authorizationType: "CUSTOM",
            authorizerId: authorizer.id,
          }),
        },
      }
    );
  },
});
