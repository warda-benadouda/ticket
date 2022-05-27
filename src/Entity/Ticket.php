<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TicketRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TicketRepository::class)]
//#[ApiResource()]
class Ticket
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    //#[Groups([])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    //#[Groups([])]
    private $label;

    #[ORM\Column(type: 'string', length: 500)]
    //#[Groups([])]
    private $taskDescription;

    #[ORM\Column(type: 'date')]
    //#[Groups([])]
    private $deadline;

    #[ORM\ManyToOne(targetEntity: user::class, inversedBy: 'tickets')]
    #[ORM\JoinColumn(nullable: false)]
    //#[Groups([])]
    private $user;

    #[ORM\Column(type: 'string', length: 255)]
    private $state;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getTaskDescription(): ?string
    {
        return $this->taskDescription;
    }

    public function setTaskDescription(string $taskDescription): self
    {
        $this->taskDescription = $taskDescription;

        return $this;
    }

    public function getDeadline(): ?\DateTimeInterface
    {
        return $this->deadline;
    }

    public function setDeadline(\DateTimeInterface $deadline): self
    {
        $this->deadline = $deadline;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }
}
