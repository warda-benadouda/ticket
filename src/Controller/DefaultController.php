<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/{reactRouting}', name: 'app_default' , defaults : [ 'reactRouting' => null ]  )]
    public function index()
    {
        return $this->render('base.html.twig');
    }
}
