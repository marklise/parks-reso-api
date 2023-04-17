import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";

export class ApiService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    const lambdaRole = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'Lambda Execution role...',
    });

    const handler = new lambda.Function(this, "generateCaptcha", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "index.handler",
      role: lambdaRole,
      environment: {
        PRIVATE_KEY: 'somePrivateKeyGetFromParameterStore',
        LOG_LEVEL:   "info"
      }
    });

    const api = new apigateway.RestApi(this, id, {
      restApiName: "ParksDayUsePassAPI",
      description: "BC Parks DUP API"
    });

    const postGenerateCaptcha = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("POST", postGenerateCaptcha); // GET /
  }
}