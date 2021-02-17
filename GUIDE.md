docker-compose exec php php artisan db:seed --class=OrganizationsTableSeede
docker-compose exec php php artisan migrate:refresh --seed
docker-compose exec php php artisan migrate:refresh
docker-compose exec php php artisan migrate --path=/database/migrations/2021_02_08_145915_create_organisations_table.php
