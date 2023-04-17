import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiService } from './api_service';

export class CDKTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // This can work: but not ideal: https://dev.to/aws-builders/regain-control-over-orphaned-resources-with-cdk-gm6
    // const table = dynamodb.Table.fromTableArn(this, 'parksreso', 'arn:aws:dynamodb:ca-central-1:375508854012:table/parksreso');
    const captchaFunction = new ApiService(this, 'dup-api');

    const operationalTable = new dynamodb.Table(this, 'parksreso', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1
    });

    const metricsTable = new dynamodb.Table(this, 'parksreso-metrics', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1
    });

    const metaTable = new dynamodb.Table(this, 'parksreso-meta', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

  }
}
