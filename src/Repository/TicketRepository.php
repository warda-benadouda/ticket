<?php

namespace App\Repository;

use App\Entity\Ticket;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Ticket>
 *
 * @method Ticket|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ticket|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ticket[]    findAll()
 * @method Ticket[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TicketRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ticket::class);
    }

    public function add(Ticket $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Ticket $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function setFilters( $queryBuilder , array $filters = []) {

        if (count($filters)) {
 

            if (array_key_exists('state', $filters)) {
                $queryBuilder->andWhere("t.state = {$filters["state"]}");
            }
 
        }
        return $queryBuilder->getQuery()->getResult(); 
    }


    public function getListeForSuperAdmin(array $filters = []) {

        $queryBuilder =  $this->createQueryBuilder('t')
            ->select('t');

        return $this->setFilters($queryBuilder , $filters );
 
    }


    public function getListeForAdmin(int $userId, array $filters = []) {
 


        $queryBuilder =  $this->createQueryBuilder('t')
            ->select('t')
            ->where('t.createdBy = :userId ')
            ->setParameter(':userId', $userId );
        
        return $this->setFilters($queryBuilder , $filters );

    }
    public function getListeForUser(int $userId, array $filters = []) {
 


        $queryBuilder =  $this->createQueryBuilder('t')
            ->select('t')
            ->where('t.user = :userId ')
            ->setParameter(':userId', $userId );
        
        return $this->setFilters($queryBuilder , $filters );

    }


//    /**
//     * @return Ticket[] Returns an array of Ticket objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Ticket
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
