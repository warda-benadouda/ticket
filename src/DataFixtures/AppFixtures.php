<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Departement;
use App\Entity\Ticket;
use App\Entity\User;
use App\DataFixtures\Constants;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private Constants $constants;
    private UserPasswordHasherInterface $passwordHasher;
    private $em;

    const USER_PASSWORD = "123456";
    const USER_EMAIL = "user{i}@mail.com";
    const USER_ROLES =  [ ['ROLE_SUPER_ADMIN'] , ['ROLE_ADMIN'] , ['ROLE_USER']];

    const DEP_NAME = "Departement{i}";

    const TICKET_LABEL= "Ticket{i}";
    const TICKET_DESC= "Ticket Description{i}";

   

    public function __construct(
        Constants $constants, 
        UserPasswordHasherInterface $passwordHasher, 
        EntityManagerInterface $manager)
    {
        $this->constants = $constants;
        $this->passwordHasher = $passwordHasher;
        $this->em = $manager;
    }
    public function loadRandomDeps(Company $company, int $key, ?int $items = null)
    {
        if (!$items) $items = 5;
        for ($i = $key * $items; $i < $items; $i++) {

            $depName = str_replace("{i}", $i, self::DEP_NAME);
            $departement = new Departement();
            $departement->setName($depName);
            $departement->setCompany($company);
            //list users 
            $this->loadRandomUsers($departement , $key , $i);
            $this->em->persist($departement);
        }
    }
    public function loadRandomUsers(Departement $dep, int $key, $d ,  ?int $items = null)
    {
        if (!$items) $items = 3;
        for ($i = $key * $items; $i < $items; $i++) {

            $email = str_replace("{i}", $i.$d , self::USER_EMAIL);
            $user = new User();
            $user->setFirstName("user${i}");
            $user->setLastName("user${i}");
            $user->setRoles(self::USER_ROLES[$i]);
            $user->setDepartement($dep);
            $this->loadRandomTickets( $user, $key);

            $user->setEmail($email);
            $user->setPassword($this->passwordHasher->hashPassword($user , self::USER_PASSWORD));
            $this->em->persist($user);

        }
    }
    public function loadRandomTickets(User $user, int $key, ?int $items = null)
    {
        if (!$items) $items = 5;
        for ($i = $key * $items; $i < $items; $i++) {

            $label = str_replace("{i}", $i, self::TICKET_LABEL);
            $description = str_replace("{i}", $i, self::TICKET_DESC);
            $ticket = new Ticket();
            $ticket->setLabel($label);
            $ticket->setTaskDescription($description);
            $ticket->setDeadline(new \DateTime('now'));
            $ticket->setUser($user);
            $ticket->setState(0);
            $this->em->persist($ticket);

        }
    }
    public function loadCompanies()
    {
        foreach ($this->constants->getCompanies() as $key => $company) {

            $_company = new Company();
            $_company->setName($company["name"]);
            $_company->setDescription($company["description"]);
            $this->loadRandomDeps( $_company, $key);
            $this->em->persist( $_company);


        }

    }

    public function load(ObjectManager $manager): void
    {

        $this->loadCompanies();
        $this->em->flush();
    }
}
