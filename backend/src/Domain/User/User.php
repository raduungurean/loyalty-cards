<?php


declare(strict_types=1);

namespace App\Domain\User;

use JsonSerializable;

class User implements JsonSerializable
{
    private ?int $id;
    private string $username;
    private string $firstName;
    private string $lastName;
    private string $email;
    private ?string $token;
    private ?string $forgetToken;

    private function __construct() {}

    public static function create(
        ?int $id,
        string $username,
        string $firstName,
        string $lastName,
        string $email,
        ?string $token = null,
        ?string $forgetToken = null
    ): self {
        $user = new self();
        $user->id = $id;
        $user->username = $username;
        $user->firstName = $firstName;
        $user->lastName = $lastName;
        $user->email = $email;
        $user->token = $token;
        $user->forgetToken = $forgetToken;
        return $user;
    }

    public static function builder(): UserBuilder
    {
        return new UserBuilder();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'token' => $this->token,
            'forgetToken' => $this->forgetToken,
        ];
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @param string $token
     */
    public function setToken(string $token): void
    {
        $this->token = $token;
    }

    public function getForgetToken(): ?string
    {
        return $this->forgetToken;
    }

    public function setForgetToken(string $token): void
    {
        $this->forgetToken = $token;
    }

    /**
     * @param int|null $id
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
}
