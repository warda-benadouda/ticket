FROM php:8.0-fpm


RUN apt-get update && apt-get install -y zlib1g-dev libpq-dev git libicu-dev libxml2-dev libgd-dev libpcre3-dev libzip-dev libsodium-dev wkhtmltopdf gawk default-mysql-client  \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-configure zip \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-install zip xml \
    && docker-php-ext-install sodium \
    && docker-php-ext-install gd

#RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb
#RUN apt install -y ./wkhtmltox_0.12.6-1.buster_amd64.deb
#RUN rm wkhtmltox_0.12.6-1.buster_amd64.deb

RUN apt-get install --reinstall libqt5widgets5 libqt5gui5 libqt5dbus5 libqt5network5 libqt5core5a
RUN strip --remove-section=.note.ABI-tag /usr/lib/x86_64-linux-gnu/libQt5Core.so.5

COPY --from=composer:2.0 /usr/bin/composer /usr/local/bin/composer
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony

# Set timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Berlin /etc/localtime
RUN "date"
USER 1000:1000
WORKDIR /var/www