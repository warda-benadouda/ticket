<?php


namespace App\DataFixtures;
use DateTime;
use Exception;

class Constants
{
    const companies = [
        [
            'name' => 'compagnie 01',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        ],
        [
            'name' => 'compagnie 02',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        ],
        [
            'name' => 'compagnie 03',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        ],
    ];
    public function getCompanies(): array
    {
        return self::companies;
    }

}    