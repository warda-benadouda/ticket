<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => [
            // "security" => "is_granted('LIST', object)",
            "normalization_context" => [
                "groups" => ["users:get"],
            ]
        ],
        'post' => [
            "security_post_denormalize" => "is_granted('CREATE', object)",
            "normalization_context" => [
                "groups" => ["users:get"],
            ],
            "denormalization_context" => [
                "groups" => ["user:post"],
            ],
        ]
    ],
    itemOperations: [
    'get' => [
        "security" => "is_granted('VIEW', object)",
        "normalization_context" => [
            "groups" => ["user:get"],
        ],
    ],
    'put' => [
        "security" => "is_granted('EDIT', object) ",
        "normalization_context" => [
            "groups" => ["user:get"],
        ],
        "denormalization_context" => [
            "groups" => ["user:put"],
        ],
    ],
    'delete' => [
        "security" => "is_granted('DELETE', object) ",
    ]],
)]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["user:get"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "user:get" , "users:get" , "user:put" , "user:post" , "tickets:get" ])]
    private $firstName;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "user:get" , "users:get" , "user:put" , "user:post" , "tickets:get" ])]
    private $lastName;

    #[ORM\Column(type: 'json')]
    #[Groups(["user:get", "users:post", "user:put"])]
    private $roles = [];

    #[ORM\ManyToOne(targetEntity: Departement::class, inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([ "user:get" , "users:get" , "user:put" , "user:post"])]
    private $departement;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Ticket::class, orphanRemoval: true)]
    #[ApiSubresource()]
    #[Groups([  "users:get" ])]
    private $tickets;

    #[ORM\Column(type: 'string', length: 255 , unique : true)]
    #[Groups([ "user:get" , "users:get" , "user:put" , "user:post" , "tickets:get" ])]
    private $email;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([  "user:put" , "user:post"])]
    private $password;

    public function __construct()
    {
        $this->tickets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles ? $this->roles :  ['ROLE_USER'];
        // guarantee every user at least has ROLE_USER

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getDepartement(): ?Departement
    {
        return $this->departement;
    }

    public function setDepartement(?Departement $departement): self
    {
        $this->departement = $departement;

        return $this;
    }

    /**
     * @return Collection<int, Ticket>
     */
    public function getTickets(): Collection
    {
        return $this->tickets;
    }

    public function addTicket(Ticket $ticket): self
    {
        if (!$this->tickets->contains($ticket)) {
            $this->tickets[] = $ticket;
            $ticket->setUser($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): self
    {
        if ($this->tickets->removeElement($ticket)) {
            // set the owning side to null (unless already changed)
            if ($ticket->getUser() === $this) {
                $ticket->setUser(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
     /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }
    /**
     * @deprecated since Symfony 5.3, use user:getIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }


    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
     /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}
