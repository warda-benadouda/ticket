<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Departement;
use App\Entity\Ticket;
use App\Entity\User;
use App\DataFixtures\Constants;
use App\Repository\CompanyRepository;
use App\Repository\DepartementRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private Constants $constants;
    private UserPasswordHasherInterface $passwordHasher;
    private $em;

   

    public function __construct ( 
        
        Constants $constants, 
        UserPasswordHasherInterface $passwordHasher, 
        EntityManagerInterface $manager
    )
    {
        $this->constants = $constants;
        $this->passwordHasher = $passwordHasher;
        $this->em = $manager;
    }
 
    public function loadCompanies()
    {
        foreach ($this->constants->getCompanies() as $key => $company) {

            $_company = new Company();
            $_company->setName($company["name"]);
            $_company->setDescription($company["description"]);
            $this->em->persist( $_company);
            $this->em->flush();
        }

    }
    public function loadDepartements()
    {
        $CompanyRepo = $this->em->getRepository(Company::class);

        foreach ($this->constants->getDepartements() as $key => $departement) {

            $_departement = new Departement();
            $_departement->setName($departement['name']);
            $company = $CompanyRepo->findOneBy(['name' => $departement['company']]);
            $_departement->setCompany($company);
            $this->em->persist($_departement);
            $this->em->flush();
        }

    }
    public function loadUsers()
    {
        $DepRepo = $this->em->getRepository(Departement::class);

        foreach ($this->constants->getUsers() as $key => $users) {
           
            $_user = new User();
            $_user->setFirstName($users['firstName']);
            $_user->setLastName($users['lastName']);
            $_user->setRoles($users['roles']);
            $dep = $DepRepo->findOneBy(['name' => $users['departement']]);
            $_user->setDepartement($dep);
            $_user->setEmail($users['email']);
            $_user->setPassword($this->passwordHasher->hashPassword($_user ,  $users['password'] ));
            $this->em->persist($_user);
            $this->em->flush();
        }

    }

    public function load(ObjectManager $manager): void
    {

        $this->loadCompanies();
        $this->loadDepartements();
        $this->loadUsers();
    }
}
