<?php


namespace App\DataFixtures;
use DateTime;
use Exception;

class Constants
{
    const companies = [
        [
            'name' => 'Entreprise 01',
            'description' => 'Description Entreprise 01',
        ],
        [
            'name' => 'Entreprise 02',
            'description' => 'Description Entreprise 02',
        ],
        [
            'name' => 'Entreprise 03',
            'description' => 'Description Entreprise 03',
        ],
    ];
    public function getCompanies(): array
    {
        return self::companies;
    }

    const departements = [

        [
            'name' => 'Departement 1 Entreprise 01',
            'company' => self::companies[0]['name'],
        ],
        [
            'name' => 'Departement 2 Entreprise 01',
            'company' => self::companies[0]['name'],
        ],
        [
            'name' => 'Departement 3 Entreprise 01',
            'company' => self::companies[0]['name'],
        ],
        [
            'name' => 'Departement 1 Entreprise 02',
            'company' => self::companies[1]['name'],
        ],
        [
            'name' => 'Departement 1 Entreprise 02',
            'company' => self::companies[1]['name'],
        ],  

    ];
    public function getDepartements(): array
    {
        return self::departements;
    }
    const users = [

        [
            'firstName' => 'warda',
            'lastName' => 'Benadouda',
            'roles'  => ['ROLE_SUPER_ADMIN'],
            'email'  => 'warda.superadmin@gmail.com' , 
            'password' => '123456' , 
            'departement'  => self::departements[0]['name'] ,
         
        ],
        [
            'firstName' => 'Utilisateur Entreprise 01',
            'lastName' => 'utilisateur',
            'roles'  => ['ROLE_USER'],
            'email'  => 'user.entreprise01@gmail.com' , 
            'password' => '123456' , 
            'departement'  => self::departements[1]['name'] ,
         
        ],
        [
            'firstName' => 'Admin Entreprise 01',
            'lastName' => 'admin',
            'roles'  => ['ROLE_ADMIN'],
            'email'  => 'admin.entreprise01@gmail.com' , 
            'password' => '123456' , 
            'departement'  => self::departements[2]['name'] ,
         
        ],

        [
            'firstName' => 'Admin Entreprise 02',
            'lastName' => 'admin',
            'roles'  => ['ROLE_ADMIN'],
            'email'  => 'admin.entreprise02@gmail.com' , 
            'password' => '123456' , 
            'departement'  => self::departements[3]['name'] ,
         
        ],
        

    ];

    public function getUsers(): array
    {
        return self::users;
    }


}    