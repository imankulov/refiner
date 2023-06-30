build:
	docker build -t prose-polish .

run:
	docker run -it --rm -p 127.0.0.1:3000:3000 prose-polish