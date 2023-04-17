#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CDKTestStack } from '../lib/cdk-test-stack';

const app = new cdk.App();
new CDKTestStack(app, 'CDKTestStack', {
  env: {
    region: "ca-central-1"
  }});
