<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Tickets\GetTicketsAction;
use App\Controller\Tickets\UploadFileAction;
use App\Repository\TicketRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TicketRepository::class)]

#[ApiResource(
    collectionOperations: [
        'get' => [
            // "security" => "is_granted('LIST', object)",
            "controller" => GetTicketsAction::class,
            "normalization_context" => [
                "groups" => ["tickets:get"],
            ]
        ],
        'post' => [
            "security_post_denormalize" => "is_granted('CREATE', object)",
            "normalization_context" => [
                "groups" => ["tickets:get"],
            ],
            "denormalization_context" => [
                "groups" => ["ticket:post"],
            ],
        ],
        'upload-finished-task' => [
            'method' => 'post',
            'path' => 'tickets/file/{id}',
            'controller' =>   UploadFileAction::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'media_object_create'],
            'openapi_context' => [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            "normalization_context" => [
                "groups" => ["tickets:get"],
            ],
        ],
    ],
    itemOperations: [
    'get' => [
        "security" => "is_granted('VIEW', object)",
        "normalization_context" => [
            "groups" => ["ticket:get"],
        ],
    ],
    'put' => [
        "security" => "is_granted('EDIT', object) ",
        "normalization_context" => [
            "groups" => ["ticket:get"],
        ],
        "denormalization_context" => [
            "groups" => ["ticket:put"],
        ],
    ],
    'delete' => [
        "security" => "is_granted('DELETE', object) ",
    ]],
)]
class Ticket
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["ticket:get" , "tickets:get" , "user:get"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "ticket:get" , "tickets:get" , "ticket:put" , "ticket:post"  , "user:get" ])]
    private $label;

    #[ORM\Column(type: 'string', length: 500)]
    #[Groups([ "ticket:get" , "tickets:get" , "ticket:put" , "ticket:post" , "user:get"  ])]
    private $taskDescription;

    #[ORM\Column(type: 'date')]
    #[Groups([ "ticket:get" , "tickets:get" , "ticket:put" , "ticket:post" , "user:get" ])]
    private $deadline;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'tickets')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([ "ticket:get" , "tickets:get" , "ticket:put" , "ticket:post"  ])]
    private $user;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "ticket:get" , "tickets:get" , "ticket:put" , "ticket:post" , "user:get"  ])]
    private $state;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'createdTickets')]
    #[Groups([ "ticket:get" , "tickets:get" , "ticket:put" , "ticket:post"   ])]
    private $createdBy;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private $Notes;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $TaskFile;

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

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getNotes(): ?string
    {
        return $this->Notes;
    }

    public function setNotes(?string $Notes): self
    {
        $this->Notes = $Notes;

        return $this;
    }

    public function getTaskFile(): ?string
    {
        return $this->TaskFile;
    }

    public function setTaskFile(?string $TaskFile): self
    {
        $this->TaskFile = $TaskFile;

        return $this;
    }
}
