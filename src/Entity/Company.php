<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => [
            // "security" => "is_granted('LIST', object)",
            "normalization_context" => [
                "groups" => ["companies:get"],
            ]
        ],
        'post' => [
            "security_post_denormalize" => "is_granted('CREATE', object)",
            "normalization_context" => [
                "groups" => ["companies:get"],
            ],
            "denormalization_context" => [
                "groups" => ["company:post"],
            ],
        ]
    ],
    itemOperations: [
    'get' => [
        "security" => "is_granted('VIEW', object)",
        "normalization_context" => [
            "groups" => ["company:get"],
        ],
    ],
    'put' => [
        "security" => "is_granted('EDIT', object) ",
        "normalization_context" => [
            "groups" => ["company:get"],
        ],
        "denormalization_context" => [
            "groups" => ["company:put"],
        ],
    ],
    'delete' => [
        "security" => "is_granted('DELETE', object) ",
    ]],
)]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([ "company:get" , "companies:get" , "user:get" ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "companies:get" , "company:get" , "company:post" , "company:put" , "departements:get" , "user:get" , "users:get" ])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ "companies:get" , "company:get" , "company:post" , "company:put" ])]
    private $description;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Departement::class, orphanRemoval: true)]
    #[Groups([ "companies:get" , "company:get" ])]
    private $departements;

    public function __construct()
    {
        $this->departements = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Departement>
     */
    public function getDepartements(): Collection
    {
        return $this->departements;
    }

    public function addDepartement(Departement $departement): self
    {
        if (!$this->departements->contains($departement)) {
            $this->departements[] = $departement;
            $departement->setCompany($this);
        }

        return $this;
    }

    public function removeDepartement(Departement $departement): self
    {
        if ($this->departements->removeElement($departement)) {
            // set the owning side to null (unless already changed)
            if ($departement->getCompany() === $this) {
                $departement->setCompany(null);
            }
        }

        return $this;
    }
    public function getValue():string {
        return $this->getId();
    }

}
