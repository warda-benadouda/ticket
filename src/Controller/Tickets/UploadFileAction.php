<?php

namespace App\Controller\Tickets;

use App\Controller\DefaultController;
use App\Entity\Ticket;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;

#[AsController]
class UploadFileAction  extends DefaultController
{

    private $em;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }
   

    public function __invoke(Request $request  , $id    )
    {

        $user = $this->getUser();
        
        if (!$user) {
            return $this->createAccessDeniedException();
        }
              
        $ticket = $this->em->getRepository(Ticket::class)->findOneBy(['id' => $id]);
        $note = $request->get('note');
        $uploadedFile = $request->files->get('file');


            if ($uploadedFile) {
                $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$uploadedFile->guessExtension();

                try {
                    $uploadedFile->move(
                        $this->getParameter('task_done_directory'),
                        $newFilename
                    );
                } catch (Exception $e) {
                    throw new Exception($e->getMessage(), 500);
                }

                $ticket->setTaskFile($newFilename);
                $ticket->setState(Ticket::STATE_DONE);
                $ticket->setNotes($note);
                $this->em->persist($ticket);
                $this->em->flush();
                
            }

            return new JsonResponse("done");
    }
}