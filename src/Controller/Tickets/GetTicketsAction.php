<?php

namespace App\Controller\Tickets;

use App\Controller\DefaultController;
use App\Repository\TicketRepository;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;

#[AsController]
class GetTicketsAction  extends DefaultController
{

    private TicketRepository  $ticketRepository;

    public function __construct(TicketRepository $ticketRepository)
    {
        $this->ticketRepository = $ticketRepository;
   
    }

    public function __invoke(Request $request)
    {

        $user = $this->getUser();

        
        $filters = [];
               

         if ($this->isGranted('ROLE_SUPER_ADMIN', $user)) {

             $tickets = $this->ticketRepository->getListeForSuperAdmin($filters );
             return $this->isGranted('LIST', $tickets) ? $tickets : throw $this->createAccessDeniedException();


         } else  {
               
            $tickets = $this->ticketRepository->getListeForAdmin( $user->getId(), $filters);
            return $this->isGranted('LIST', $tickets) ? $tickets : throw $this->createAccessDeniedException();
        } 
    }
}