<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
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
            return count(BaseVoter::checkArrayInstances($subject, User::class)) === count($subject);
        }
        if (!$subject instanceof User) {

            return false;
        }

       
        return $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {

         if ($this->security->isGranted(BaseVoter::SUPER_ADMIN)) {
            return true;
        }

        $user = $this->security->getUser();
        
        switch ($attribute) {
            case 'LIST':
                if ($this->security->isGranted(BaseVoter::ADMIN)) {
                    if (is_array($subject)) {
                        return count(BaseVoter::checkArrayInstances($subject, User::class)) === count($subject);
                    }
                }
                break;
            case 'CREATE':
                return $this->security->isGranted(BaseVoter::SUPER_ADMIN);
                break;
            case 'VIEW':
                
                if ( $this->security->isGranted(BaseVoter::ADMIN) ) {
                    return $subject->getDepartement()->getCompany() === $user->getDepartement()->getCompany();
                }
                if ( $this->security->isGranted(BaseVoter::USER) ) {
                    return $user === $subject;
                }
            case 'EDIT':
                return $this->security->isGranted(BaseVoter::SUPER_ADMIN);
                break;
            case 'DELETE':
                 return $this->security->isGranted(BaseVoter::SUPER_ADMIN);
                
        }
        return false;
    }
}
