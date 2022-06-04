<?php

namespace App\Security\Voter;

use App\Entity\Departement;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class DepartementVoter extends Voter
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
            return count(BaseVoter::checkArrayInstances($subject, Departement::class)) === count($subject);
        }
        if (!$subject instanceof Departement) {

            return false;
        }
       
        return $subject instanceof Departement;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {

         if ($this->security->isGranted(BaseVoter::SUPER_ADMIN)) {
            return true;
        }

        $user = $this->security->getUser();
        
        switch ($attribute) {
            case 'LIST':
                return $this->security->isGranted(BaseVoter::ADMIN);
                break;
            case 'CREATE':
                return $this->security->isGranted(BaseVoter::SUPER_ADMIN);
                break;
            case 'EDIT':
                return $this->security->isGranted(BaseVoter::SUPER_ADMIN);
                break;
            case 'VIEW':
                return $subject->getCompany() === $user->getDepartement()->getCompany();
                break;
            
        }

        return false;
    }
}
