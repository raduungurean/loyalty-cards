<?php

declare(strict_types=1);

namespace App\Domain\Card;

use JsonSerializable;

class Card implements JsonSerializable
{
    private ?int $id;
    private ?int $uid;
    private string $title;
    private ?string $color;
    private string $description;
    private ?string $barcode;
    private ?string $icon;
    private $created_at;
    private $updated_at;

    public function __construct(
        ?int $id,
        string $title,
        ?string $color,
        string $description,
        $created_at,
        $updated_at,
        $barcode,
        $icon,
        ?int $uid
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->color = $color;
        $this->description = $description;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
        $this->uid = $uid;
        $this->barcode = $barcode;
        $this->icon = $icon;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'uid' => $this->uid,
            'title' => $this->title,
            'color' => $this->color,
            'barcode' => $this->barcode,
            'icon' => $this->icon,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
