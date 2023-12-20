## AWS Cloud Resume Challenge

## Architecture

![Architecture Diagram](/img/architecture.png)


**Architecture Overview:**

1.  **User Request:**

    -   User initiates a request to the website [dawarjafri.com](http://dawarjafri.com).
2.  **DNS Resolution (Amazon Route 53):**

    -   Route 53 resolver handles the domain resolution pointing to a CloudFront distribution.
3.  **Content Delivery (Amazon CloudFront):**

    -   Route 53 forwards the request to CloudFront distribution, a global content delivery network which serves the static files at edge locations.
4.  **Static Website Hosting (Amazon S3):**

    -   CloudFront sends the request to a private S3 bucket containing static website files.
5.  **API Gateway and Lambda Function:**

    -   Simultaneously, a GET request is sent to an API Gateway endpoint.
    -   API Gateway triggers a Lambda function responsible for updating and retrieving a visit counter in DynamoDB.
6.  **DynamoDB Database:**

    -   The Lambda function interacts with DynamoDB to update the counter attribute each time the page is accessed and retrieve the visit counter.
7.  **Response to Website:**

    -   The Lambda function sends the updated visit counter back to the website and is displayed as `Views:`. 

**Services Used**:

- S3
- AWS CloudFront
- Certificate Manager
- AWS Lambda
- Dynamo DB
- GitHub Actions

___

## [Live Demo 🔗](https://dawarjafri.com)

#### TODO: 
- Deploy the architecture using Terraform (WIP)
- Decrease view counter response time