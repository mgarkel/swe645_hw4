FROM ubuntu:latest

RUN mkdir server

WORKDIR /server

COPY req.txt /server/req.txt

COPY script.py /server/script.py

RUN apt-get update -y && \
	apt-get install -y python-pip python-dev

RUN apt-get install libmysqlclient-dev -y && \
	pip install mysqlclient && \
	pip install -r req.txt

EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["script.py"]



