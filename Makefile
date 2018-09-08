# Build docker image
build:
	docker build -t aad-aws-auth:latest .

run:
	docker run -it -p 3000:3000 --rm --name aad-aws-auth-v1 aad-aws-auth:latest

