import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
table = dynamodb.Table('student')


def lambda_handler(event, context):
    res = table.scan()
    return {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With", 
        'statusCode': 200, 
        'body': res
        
    }
