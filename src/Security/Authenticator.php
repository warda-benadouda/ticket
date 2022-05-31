<?php
namespace App\Security;


use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccountExpiredException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationSuccessResponse;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface as ContractsEventDispatcherInterface;
/**
 * AuthenticationSuccessHandler.
 *
 * @author Dev Lexik <dev@lexik.fr>
 */
class Authenticator implements AuthenticationSuccessHandlerInterface
{
    protected JWTTokenManagerInterface $jwtManager;
    protected EventDispatcherInterface $dispatcher;

    public function __construct(JWTTokenManagerInterface $jwtManager, EventDispatcherInterface $dispatcher)
    {
        $this->jwtManager = $jwtManager;
        $this->dispatcher = $dispatcher;
    }

    /**
     * {@inheritdoc}
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        return $this->handleAuthenticationSuccess($token->getUser());
    }

    public function handleAuthenticationSuccess(UserInterface $user, $jwt = null)
    {
  

        $data = $this->generateProfileData($user, $jwt);
        
        $response = new JWTAuthenticationSuccessResponse($jwt);


        $event    = new AuthenticationSuccessEvent($data, $user, $response);

        if ($this->dispatcher instanceof ContractsEventDispatcherInterface) {
            $this->dispatcher->dispatch($event, Events::AUTHENTICATION_SUCCESS);
        } else {
            $this->dispatcher->dispatch($event,Events::AUTHENTICATION_FAILURE);
        }

        $response->setData($event->getData());
      
        return $response;
    }

    /**
     * @param UserInterface $user
     * @param $jwt
     * @return array
     */
    public function generateProfileData (UserInterface $user, $jwt = null): array
    {
        if (null === $jwt) {
            $jwt = $this->jwtManager->create($user);
        }

        return ['token' => $jwt,
            "id"=>$user->getId(),
            "firstname" => $user->getFirstName(),
            "lastname" => $user->getLastName(),
            "email" => $user->getEmail(),
            "roles" => $user->getRoles(),
            "companyId" => $user->getDepartement()->getCompany()->getValue()
        ];
    }
}
