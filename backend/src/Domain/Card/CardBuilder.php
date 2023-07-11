<?php

namespace App\Domain\Card;

use DateTime;

class CardBuilder
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

    public function uid(int $uid): self
    {
        $this->data['uid'] = $uid;
        return $this;
    }

    public function title(string $title): self
    {
        $this->data['title'] = $title;
        return $this;
    }

    public function color(?string $color): self
    {
        $this->data['color'] = $color;
        return $this;
    }

    public function description(string $description): self
    {
        $this->data['description'] = $description;
        return $this;
    }

    public function createdAt(DateTime $createdAt): self
    {
        $this->data['created_at'] = $createdAt;
        return $this;
    }

    public function updatedAt(DateTime $updatedAt): self
    {
        $this->data['updated_at'] = $updatedAt;
        return $this;
    }

    public function barcode(string $barcode): self
    {
        $this->data['barcode'] = $barcode;
        return $this;
    }

    public function icon($icon): self
    {
        $this->data['icon'] = $icon;
        return $this;
    }

    public function build(): Card
    {
        return Card::create(
            $this->data['id'] ?? null,
            $this->data['title'] ?? '',
            $this->data['color'] ?? null,
            $this->data['description'] ?? '',
            $this->data['created_at'] ?? new DateTime(),
            $this->data['updated_at'] ?? new DateTime(),
            $this->data['barcode'] ?? '',
            $this->data['icon_path'] ?? '',
            $this->data['uid'] ?? null,
        );
    }

    public function fromRow(array $row): self
    {
        $this->data['id'] = $row['id'];
        $this->data['title'] = $row['title'];
        $this->data['color'] = $row['color'];
        $this->data['description'] = $row['description'];
        $this->data['created_at'] = $row['created_at'] ? new DateTime($row['created_at']) : new DateTime();
        $this->data['updated_at'] = $row['updated_at'] ? new DateTime($row['updated_at']) : new DateTime();
        $this->data['barcode'] = $row['barcode'];
        $this->data['icon_path'] = $row['icon_path'];
        $this->data['uid'] = $row['uid'];

        return $this;
    }
}
