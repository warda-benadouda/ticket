<?php

namespace App\Security\Voter;

use App\Entity\Ticket;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class TicketVoter extends Voter
{
    private $security = null;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        $supportsAttribute = in_array($attribute, ['LIST', 'VIEW', 'CREATE', 'READ', 'EDIT', 'DELETE']);

        if (!$supportsAttribute) {
            return false;
        }
        if (is_array($subject)){
            return count(BaseVoter::checkArrayInstances($subject, Ticket::class)) === count($subject);
        }
       
        return $subject instanceof Ticket;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {

         if ($this->security->isGranted(BaseVoter::SUPER_ADMIN)) {
            return true;
        }

        $user = $this->security->getUser();
        
        switch ($attribute) {
            case 'LIST':
                if ($this->security->isGranted(BaseVoter::ADMIN) || $this->security->isGranted(BaseVoter::USER)) {
                    if (is_array($subject)) {
                        return count(BaseVoter::checkArrayInstances($subject, Ticket::class)) === count($subject);
                    }
                }

                break;
            case 'CREATE':
                if ( $this->security->isGranted(BaseVoter::ADMIN) ) {
                    return $subject->getUser()->getDepartement()->getCompany() === $user->getDepartement()->getCompany();
                }
                break;
            case 'VIEW':
                if ( $this->security->isGranted(BaseVoter::ADMIN) ) {
                    return $subject->getUser()->getDepartement()->getCompany() === $user->getDepartement()->getCompany();
                }
                if ( $this->security->isGranted(BaseVoter::USER) ) {
                    return $user === $subject->getUser();
                }
            case 'EDIT':
                if ( $this->security->isGranted(BaseVoter::ADMIN) ) {
                    return $subject->getUser()->getDepartement()->getCompany() === $user->getDepartement()->getCompany();
                }
                if ( $this->security->isGranted(BaseVoter::USER) ) {
                    return $user === $subject->getUser();
                }
                break;
            case 'DELETE':
                return $this->security->isGranted(BaseVoter::ADMIN);
                break;
        }
        return false;
    }
}
