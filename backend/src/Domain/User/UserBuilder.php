<?php
namespace App\Domain\User;

class UserBuilder
{
    private array $data;

    public function __construct()
    {
        $this->data = [];
    }

    public function id(int $id): self
    {
        $this->data['id'] = $id;
        return $this;
    }

    public function username(string $username): self
    {
        $this->data['username'] = strtolower($username);
        return $this;
    }

    public function firstName(string $firstName): self
    {
        $this->data['first_name'] = ucfirst($firstName);
        return $this;
    }

    public function lastName(string $lastName): self
    {
        $this->data['last_name'] = ucfirst($lastName);
        return $this;
    }

    public function email(string $email): self
    {
        $this->data['email'] = $email;
        return $this;
    }

    public function token(?string $token): self
    {
        $this->data['token'] = $token;
        return $this;
    }

    public function forgetToken(?string $forgetToken): self
    {
        $this->data['forget_token'] = $forgetToken;
        return $this;
    }

    public function build(): User
    {
        return User::create(
            $this->data['id'] ?? null,
            $this->data['username'] ?? '',
            $this->data['first_name'] ?? '',
            $this->data['last_name'] ?? '',
            $this->data['email'] ?? '',
            $this->data['token'] ?? null,
            $this->data['forget_token'] ?? null
        );
    }

    public function fromRow(array $row): self
    {
        $this->data['id'] = $row['id'];
        $this->data['username'] = $row['username'];
        $this->data['first_name'] = $row['first_name'];
        $this->data['last_name'] = $row['last_name'];
        $this->data['email'] = $row['email'];
        $this->data['token'] = $row['token'];
        $this->data['forget_token'] = $row['forgot_token'];

        return $this;
    }
}

