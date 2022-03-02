# Pull the httpd image from DockerHub repository to build our application as a base
FROM httpd:2.4.52-alpine

# Copy the static page from the target directory to apache2 docs
COPY ./app/ /usr/local/apache2/htdocs/