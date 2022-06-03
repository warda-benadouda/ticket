# ticket

Technologies 

symfony 5.4
react js  18.1.0

run with Docker

docker-compose up -d --build

docker-compose exec php composer install

docker-compose exec php bin/console doctrine:migrations:migrate

docker-compose exec php bin/console doctrine:fixture:load

docker-compose exec php bin/console lexik:jwt:generate-keypair

yarn install & yarn encore dev
