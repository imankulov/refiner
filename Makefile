build:
	docker build -t refiner .

run:
	docker run -it --rm -v `pwd`/.env.local:/app/.env.local  -p 127.0.0.1:3000:3000 refiner