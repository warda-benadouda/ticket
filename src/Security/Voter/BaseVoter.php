<?php


namespace App\Security\Voter;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use App\Entity\User\User;

class BaseVoter
{

    public const SUPER_ADMIN = "ROLE_SUPER_ADMIN";
    public const ADMIN = "ROLE_ADMIN";
    public const USER = "ROLE_USER";

  
    public static function checkArrayInstances($array, $instance) {
        return array_filter( $array, function ($entry) use($instance) {
            return is_a($entry, $instance);
        });
    }

}
