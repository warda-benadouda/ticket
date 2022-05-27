<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DepartementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DepartementRepository::class)]

//#[ApiResource()]

class Departement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    //#[Groups([])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    //#[Groups([])]
    private $name;

    #[ORM\ManyToOne(targetEntity: Company::class, inversedBy: 'departements')]
    #[ORM\JoinColumn(nullable: false)]
    //#[Groups([])]
    private $company;

    #[ORM\OneToMany(mappedBy: 'departement', targetEntity: User::class, orphanRemoval: true)]
    //#[Groups([])]
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
