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

        // dump($this->getUser());
        // dd("ici");

        $user = 1;
        $filters = [];
               
       
        return $tickets = $this->ticketRepository->getListeForAdmin( 1, $filters);

        //  if ($this->isGranted('ROLE_SUPER_ADMIN', $user)) {

        //      $tickets = $this->ticketRepository->getListeForSuperAdmin($filters );
        //      return $this->isGranted('LIST', $tickets) ? $tickets : throw $this->createAccessDeniedException();


        //  } else  if ($this->isGranted('ROLE_ADMIN', $user)) {
               
        //     $tickets = $this->ticketRepository->getListeForAdmin( $user->getId(), $filters);
        //     return $this->isGranted('LIST', $tickets) ? $tickets : throw $this->createAccessDeniedException();
        // } 
    }
}