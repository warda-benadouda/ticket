<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DepartementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DepartementRepository::class)]

#[ApiResource(
    collectionOperations: [
        'get' => [
            // "security" => "is_granted('LIST', object)",
            "normalization_context" => [
                "groups" => ["departements:get"],
            ]
        ],
        'post' => [
            "security_post_denormalize" => "is_granted('CREATE', object)",
            "normalization_context" => [
                "groups" => ["departements:get"],
            ],
            "denormalization_context" => [
                "groups" => ["departement:post"],
            ],
        ]
    ],
    itemOperations: [
    'get' => [
        "security" => "is_granted('VIEW', object)",
        "normalization_context" => [
            "groups" => ["departement:get"],
        ],
    ],
    'put' => [
        "security" => "is_granted('EDIT', object) ",
        "normalization_context" => [
            "groups" => ["departement:get"],
        ],
        "denormalization_context" => [
            "groups" => ["departement:put"],
        ],
    ],
    'delete' => [
        "security" => "is_granted('DELETE', object) ",
    ]],
)]

class Departement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([ "departement:get"  ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "departements:get" , "departement:get" , "departement:post" , "departement:put" ])]
    private $name;

    #[ORM\ManyToOne(targetEntity: Company::class, inversedBy: 'departements')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([ "departements:get" , "departement:get" , "departement:post" , "departement:put" ])]
    private $company;

    #[ORM\OneToMany(mappedBy: 'departement', targetEntity: User::class, orphanRemoval: true)]
    
    private $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setDepartement($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getDepartement() === $this) {
                $user->setDepartement(null);
            }
        }

        return $this;
    }
}
