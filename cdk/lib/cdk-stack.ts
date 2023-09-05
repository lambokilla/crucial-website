import { defaultRegionParam, imageBucketParam } from "../../libs/common/src/index";
import * as cdk from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from 'constructs';
import { AdditionalFuncOptions, createFunction, CreateFunctionResult } from "./create-function";
import { ParamOutput } from "./ParamOutput";

export class CdkStack extends cdk.Stack {

	public readonly params = new ParamOutput();

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		this.params.setParam(defaultRegionParam, this.region);

		// Create imageBucket
        const imageBucket = this.createPublicBucket("imageBucket", true);
        this.params.setParam(imageBucketParam, imageBucket.bucketName);
		imageBucket.grantPublicAccess();

        this.params.generateOutputs(this);
	}

	private readonly allFunctions: CreateFunctionResult[] = [];

	createFunctionAndUrl(name: string, props: Partial<lambdaNode.NodejsFunctionProps> & AdditionalFuncOptions = {}): CreateFunctionResult {
        if (!props.timeout) {
            props = {
                ...props,
                timeout: props.timeout ?? cdk.Duration.minutes(1)
            }
        }
        const result = createFunction(this, name, props);

        this.allFunctions.push(result);
        return result;
    }

    createFunction(name: string, props: Partial<lambdaNode.NodejsFunctionProps> & AdditionalFuncOptions = {}): lambda.Function {
        return this.createFunctionAndUrl(name, props).func;
    }

	createPublicBucket(name: string, enableCors: boolean) {
        if (enableCors) {
            return new s3.Bucket(this, name, {
                cors: [{
                    allowedOrigins: ['*'],
                    allowedMethods: [
                        s3.HttpMethods.GET,
                        s3.HttpMethods.PUT,
                        s3.HttpMethods.HEAD,
                        s3.HttpMethods.POST,
                        s3.HttpMethods.DELETE,
                    ],
                    allowedHeaders: ["*"],
                    maxAge: 60 * 60 * 24,
                }],
                blockPublicAccess: {
                    blockPublicAcls: false,
                    blockPublicPolicy: false,
                    ignorePublicAcls: false,
                    restrictPublicBuckets: false,
                },
            });
        } else {
            return new s3.Bucket(this, name, {
                blockPublicAccess: {
                    blockPublicAcls: false,
                    blockPublicPolicy: false,
                    ignorePublicAcls: false,
                    restrictPublicBuckets: false,
                },
            });
        }
    }
}
