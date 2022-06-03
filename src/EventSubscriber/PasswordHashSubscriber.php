<?php
namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

class PasswordHashSubscriber implements EventSubscriberInterface
{

    private UserPasswordHasherInterface  $passwordHasher;
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;


    public function __construct( UserPasswordHasherInterface $passwordHasher , EntityManagerInterface $em)
    {
        $this->passwordHasher = $passwordHasher; 
        $this->em = $em;

    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW =>['hashPassword',EventPriorities::PRE_WRITE]
        ];
    }
    
    public function hashPassword(ViewEvent $event){

        $user = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();
        if(!$user instanceof User || (Request::METHOD_POST !== $method)){
            return;
        }

        $hashedPassword =  $this->passwordHasher->hashPassword(
            $user,
            $user->getPassword()
        );
        $user->setPassword($hashedPassword);



    }


}