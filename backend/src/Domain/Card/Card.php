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

    private function __construct() {}

    public static function create(
        ?int $id,
        string $title,
        ?string $color,
        string $description,
        $created_at,
        $updated_at,
        $barcode,
        $icon,
        ?int $uid
    ): self {
        $card = new self();
        $card->id = $id;
        $card->title = $title;
        $card->color = $color;
        $card->description = $description;
        $card->created_at = $created_at;
        $card->updated_at = $updated_at;
        $card->uid = $uid;
        $card->barcode = $barcode;
        $card->icon = $icon;
        return $card;
    }

    public static function builder(): CardBuilder
    {
        return new CardBuilder();
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
